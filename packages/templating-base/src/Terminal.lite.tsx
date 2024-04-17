type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  elRef: any;
};

export default function Terminal(props: Props) {
  return <div ref={props.elRef} />;
}
