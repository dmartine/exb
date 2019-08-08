import { React } from 'jimu-core';
import { ImageProps, ListItem } from 'jimu-ui';
import { ListItemCardProps } from 'dist/widgets/arcgis/feature-list/src/runtime/widget';


// NOTE: datasetRecord.getData() returns any
export class HubEvent extends React.PureComponent<{index:number, data: any, context: any, intl: any, target?:string, portalUrl?: string, token?: string}>{

  _eventStartsOnHour(startDate:Date) {
    return startDate.getMinutes() === 0;
  }

  _eventEndsOnHour(endDate:Date){
    return endDate.getMinutes() === 0;
  }

  _isSingleDay ( startDate:Date, endDate:Date) {
    return startDate.getDate() === endDate.getDate() && startDate.getMonth() === endDate.getMonth() && startDate.getFullYear() === endDate.getFullYear();
  }

  _doesSpanYear ( startDate:Date, endDate:Date) {
    return startDate.getFullYear() !== endDate.getFullYear();
  }

  _simpleTimeRange(startDate:Date, endDate:Date, intl){
    let result = '';
    const formatWithoutYear = {
      weekday: 'long',
    };

    const formatWithMultipleYears = {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    };

    const timeSeparator = '-';
    const timeFormat = 'short';
    const timeZoneFormat = 'short';
    const eventStartsOnHour = this._eventStartsOnHour(startDate);
    const eventEndsOnHour = this._eventEndsOnHour(endDate);

    const endDateFormat = eventEndsOnHour ? {hour: timeFormat, timeZoneName: timeZoneFormat} : {hour: timeFormat, minute: timeFormat, timeZoneName: timeZoneFormat};
    const startDateformat = eventStartsOnHour ? {hour: timeFormat} : {hour: timeFormat, minute: timeFormat};

    if (!this._isSingleDay(startDate, endDate)) {
      if (this._doesSpanYear(startDate, endDate)) {
        result = `${intl.formatDate(startDate, formatWithoutYear)}, ${intl.formatDate(startDate, startDateformat)} ${timeSeparator} ${intl.formatDate(endDate, formatWithoutYear)}, ${intl.formatDate(endDate, endDateFormat)}, ${intl.formatDate(endDate, formatWithMultipleYears)} `;
      } else {
        result = `${intl.formatDate(startDate, formatWithoutYear)}, ${intl.formatDate(startDate, startDateformat)} ${timeSeparator} ${intl.formatDate(endDate, formatWithoutYear)}, ${intl.formatDate(endDate, endDateFormat)} `;
      }
    } else {
      result = `${intl.formatDate(startDate, formatWithoutYear)}, ${intl.formatDate(startDate, startDateformat)} ${timeSeparator} ${intl.formatDate(endDate, endDateFormat)} `;
    }
    return result;
  }

  render(){
    const {
      index,
      data,
      context, 
      target,
      intl
    } = this.props
    const alt = `${data.title} image`;
    const defaultImageUrl = `${context.folderUrl}dist/runtime/assets/blues-blurred.jpg`;
    const eventImage: ImageProps = {
      src: (data.imageUrl)? data.imageUrl: defaultImageUrl ,
      alt,
      shape: 'rectangle',
    }
    //TODO: Fix date formatting
    //const date = this._simpleTimeRange(new Date(data.startDate), new Date(data.endDate), intl);


    const date = `${(new Date(data.startDate)).toLocaleString()} - ${(new Date(data.endDate).toLocaleString())}  `;

    const text = date + data.description;

    const eventProps: ListItemCardProps = {
      _dataIndex: index,
      objectId: data.OBJECTID as number,
      title: data.title,
      description: text,
      image: eventImage,
      horizontal: true
    };
      
  return <ListItem
    key={index}
    data={eventProps}
    selectable={true}
    showActive={false}
    to={data.slug}
    target={target}
    width={720} //TODO make this configurable 
    />
  }
}
