import { Fragment, type ElementType, type ReactNode } from 'react';

type Props = {
  text: string;
  as?: ElementType;
  className?: string;
  id?: string;
  delay?: number;
  children?: ReactNode;
};

/**
 * Splits a heading into masked words that rise in on view. The text itself
 * is unchanged and stays readable to assistive tech in natural order.
 */
export function Split({ text, as: Tag = 'h2', className = '', id, delay = 0 }: Props) {
  const words = text.split(' ');
  return (
    <Tag id={id} className={`split ${className}`} style={{ ['--d' as string]: `${delay}ms` }}>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="split-word">
            <span style={{ ['--i' as string]: i }}>{w}</span>
          </span>
          {i < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </Tag>
  );
}
