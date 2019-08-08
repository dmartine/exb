/** @jsx jsx */
import { jsx, css, polished, ThemeVariables } from 'jimu-core'
import { Icon } from 'jimu-ui';

const closeIcon = require('jimu-ui/lib/icons/close-16.svg');

interface Props {
  onClose?: () => void;
  theme: ThemeVariables;
  text: string;
}

export const PopperHeader = ({ theme, onClose, text }: Props) => {
  const gray300 = theme ? theme.colors.grays.gray300 : '';
  const gray700 = theme ? theme.colors.grays.gray700 : '';

  const style = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: ${polished.rem(50)};
    user-select: none;
    touch-action: none;
    border-bottom: 1px ${gray300} solid;
    .close-div {
      cursor: pointer;
    }
    .jimu-icon {
      color: ${gray700};
    }
  `;

  return <div css={style} className={'px-3 m-1'}>
    <span className="title" title={text}>{text}</span>
    <div className="close-div" onClick={onClose}>
      <Icon icon={closeIcon} size="14" />
    </div>
  </div>;
};
