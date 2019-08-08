import { BaseWidget, React, SessionManager } from 'jimu-core';
import { AllWidgetProps } from 'jimu-core';
import * as classnames from 'classnames';
import {IMConfig} from '../config';
import {UserMenu} from 'jimu-ui';

export default class Widget extends BaseWidget<AllWidgetProps<IMConfig>, {}>{

  constructor(props) {
    super(props);
  }

  render() {
    // get user, sign in/out actions, CSS class names from props
    const {
      user,
      className,
      config
    } = this.props;

    // merge CSS class names
    const classes = classnames(
      'widget-user-menu',
      className
    );

    // NOTE: I had to add the check for config only for the tests
    // it seems like that should be added by the test widget wrapper
    return <div className={classes}><UserMenu user={user} useHub={config && config.hub} onSignIn={SessionManager.getInstance().signIn} onSignOut={SessionManager.getInstance().signOut} /></div>;
  }
}
