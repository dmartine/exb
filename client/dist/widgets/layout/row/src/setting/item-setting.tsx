/** @jsx jsx */
import {
  React,
  Immutable,
  LayoutInfo,
  jsx,
  LayoutItemJson,
  lodash,
  BoundingBox,
} from 'jimu-core';
import {
  SettingSection,
  SettingRow,
  InputUnit,
} from 'jimu-for-builder';
import { UnitTypes, LinearUnit, Input } from 'jimu-ui';
import { CommonLayoutItemSetting } from 'jimu-layouts/layout-builder';

const inputStyle = { width: 110 };

const availableUnits = [UnitTypes.PIXEL];

export default class RowItemSetting extends React.PureComponent<{
  layoutId: string;
  layoutItem: LayoutItemJson;
  formatMessage: (id: string) => string;
  onSettingChange: (layoutInfo: LayoutInfo, setting) => void;
  onPosChange: (layoutInfo: LayoutInfo, bbox: BoundingBox) => void;
}> {
  updateStyle(key, value) {
    const { layoutItem } = this.props;
    let style = Immutable(lodash.getValue(layoutItem, 'setting.style', {}));
    this.props.onSettingChange(
      {
        layoutId: this.props.layoutId,
        layoutItemId: this.props.layoutItem.id,
      },
      {
        style: style.set(key, value),
      }
    );
  }

  updateAlign = (e) => {
    this.updateStyle('alignSelf', e.target.value);
  }

  updateHeight = (value: LinearUnit) => {
    const { bbox } = this.props.layoutItem;
    const update = {
      height: `${value.distance}${value.unit}`,
    };
    this.props.onPosChange(
      {
        layoutId: this.props.layoutId,
        layoutItemId: this.props.layoutItem.id,
      },
      lodash.assign({}, bbox, update) as any,
    );
  }

  updateOffsetX = (e) => {
    const setting = this.props.layoutItem.setting || Immutable({});
    this.props.onSettingChange(
      {
        layoutId: this.props.layoutId,
        layoutItemId: this.props.layoutItem.id,
      },
      setting.set('offsetX', +e.target.value),
    );
  }

  updateOffsetY = (e) => {
    const setting = this.props.layoutItem.setting || Immutable({});
    this.props.onSettingChange(
      {
        layoutId: this.props.layoutId,
        layoutItemId: this.props.layoutItem.id,
      },
      setting.set('offsetY', +e.target.value),
    );
  }

  formatMessage = (id: string) => {
    return this.props.formatMessage(id);
  }

  render() {
    const { layoutItem, layoutId, onSettingChange } = this.props;
    if (!layoutItem) {
      return null;
    }
    const itemSetting = layoutItem.setting || {};
    const bbox = layoutItem.bbox;
    const style = itemSetting.style || {};

    return (
      <div className="fixed-item-setting">
        <SettingSection title={this.formatMessage('size')}>
          <SettingRow label={this.formatMessage('height')}>
            <InputUnit
              style={inputStyle}
              units={availableUnits}
              value={{
                distance: parseFloat(bbox.height),
                unit: UnitTypes.PIXEL,
              }}
              onChange={this.updateHeight}
            />
          </SettingRow>
        </SettingSection>
        <SettingSection>
          <SettingRow label={this.formatMessage('align')}>
            <Input type="select" value={style.alignSelf} onChange={this.updateAlign}>
              <option value="flex-start">{this.formatMessage('T')}</option>
              <option value="flex-end">{this.formatMessage('B')}</option>
              <option value="center">{this.formatMessage('center')}</option>
              {/* <option value="stretch">stretch</option> */}
            </Input>
          </SettingRow>
        </SettingSection>
        <SettingSection title={this.formatMessage('position')}>
          <SettingRow label={this.formatMessage('offsetX')}>
            <Input
              type="number"
              style={inputStyle}
              value={itemSetting.offsetX}
              onChange={this.updateOffsetX}
            />
          </SettingRow>
          <SettingRow label={this.formatMessage('offsetY')}>
            <Input
              type="number"
              style={inputStyle}
              value={itemSetting.offsetY}
              onChange={this.updateOffsetY}
            />
          </SettingRow>
        </SettingSection>
        <CommonLayoutItemSetting
          layoutId={layoutId}
          layoutItem={layoutItem}
          onSettingChange={onSettingChange}
          itemSetting={layoutItem.setting}
          formatMessage={this.props.formatMessage}/>
      </div>
    );
  }
}
