import { TagStyled } from './styled';
import { TagProps } from './props';

export const Tag = ({ tag, styles }: TagProps) => (
  <TagStyled styles={styles} tag={tag}>
    {tag}
  </TagStyled>
);
