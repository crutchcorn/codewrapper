type Props = {
  elRef: any;
};

export default function CodeEditor(props: Props) {
  return <div ref={props.elRef} />;
}
