import {
  ViewPlugin,
  DecorationSet,
  ViewUpdate,
  EditorView,
} from "@codemirror/view";
import { Decoration } from "@codemirror/view";
import { RangeSetBuilder } from "@codemirror/state";
import { Extension } from "@codemirror/state";
import { Facet } from "@codemirror/state";

const baseTheme = EditorView.baseTheme({
  "&light .cm-zebraStripe": { backgroundColor: "#d4fafa" },
  "&dark .cm-zebraStripe": { backgroundColor: "#1a2727" },
});
const stepSize = Facet.define<number, number>({
  combine: (values) => (values.length ? Math.min(...values) : 2),
});

export function zebraStripes(options: { step?: number } = {}): Extension {
  return [
    baseTheme,
    options.step == null ? [] : stepSize.of(options.step),
    showStripes,
  ];
}
const stripe = Decoration.line({
  attributes: { class: "cm-zebraStripe" },
});

function stripeDeco(view: EditorView) {
  const step = view.state.facet(stepSize);
  const builder = new RangeSetBuilder<Decoration>();
  for (const { from, to } of view.visibleRanges) {
    for (let pos = from; pos <= to; ) {
      const line = view.state.doc.lineAt(pos);
      if (line.number % step == 0) builder.add(line.from, line.from, stripe);
      pos = line.to + 1;
    }
  }
  return builder.finish();
}
const showStripes = ViewPlugin.fromClass(
  class {
    decorations: DecorationSet;

    constructor(view: EditorView) {
      this.decorations = stripeDeco(view);
    }

    update(update: ViewUpdate) {
      if (update.docChanged || update.viewportChanged)
        this.decorations = stripeDeco(update.view);
    }
  },
  {
    decorations: (v) => v.decorations,
  },
);
