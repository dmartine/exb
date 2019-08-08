/** @jsx jsx */
import {React, jsx, css, classNames as classnames, LayoutItemConstructorProps} from 'jimu-core';

interface Props{
  item: LayoutItemConstructorProps;
  hideLabel: boolean;
}

export default class NewElementItem extends React.PureComponent<Props>{
  constructor(props) {
    super(props);
  }

  render(){
    const {item, hideLabel} = this.props;
    return (
      <div className={classnames('d-flex align-items-start justify-content-center', {'pt-4': hideLabel})}
        style={{
          position: 'relative',
          paddingTop: '14px'
        }}
        key={item.name}
      >
        <div className="widget-card-item-content d-flex flex-column h-100">
          <div className="d-flex justify-content-center">
            <div className="widget-card-image mb-2">
              <img className="w-100" src={item.icon} />
            </div>
          </div>
          {!hideLabel && <div className={classnames('widget-card-name flex-grow-1 d-flex align-items-center', {'mt-0': !!(item.label.length > 11)})}
          title={item.label}
          >
            <span className="text-center text-capitalize text-truncate"
            css={css`line-height: 1rem;max-height:2.2rem;white-space: normal;`}
            title={item.label}>{item.label}</span>
          </div>}
        </div>
      </div>
    );
  }
}
