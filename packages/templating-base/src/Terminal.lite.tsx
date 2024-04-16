type Props = {
  elRef: any;
};

export default function Terminal(props: Props) {
  return <div ref={props.elRef} />;
}
