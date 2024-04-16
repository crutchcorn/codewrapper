import { Container as ContainerBase } from "@mitosis.template/templating-base/react";
import { setElement } from "@mitosis.template/core";

export const Container = () => {
  const callback = (el: HTMLElement) => {
    if (!el) return;
    setElement(el);
  };
  return <ContainerBase ref={callback} />;
};
