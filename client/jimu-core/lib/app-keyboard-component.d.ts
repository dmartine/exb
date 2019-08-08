import * as React from 'react';
export default class AppKeyboardComponentInner extends React.PureComponent<{}, {}> {
    onKeyboardTrigger: (event: KeyboardEvent) => void;
    isMac: () => boolean;
    render(): JSX.Element;
}
