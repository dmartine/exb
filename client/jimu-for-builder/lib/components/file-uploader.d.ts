/// <reference types="react" />
import { React } from 'jimu-core';
interface Props {
    accept: string;
    onUploadSuccess?: (csv: CsvFileInfo) => void;
}
export interface CsvFileInfo {
    name: string;
    id: string;
    records: object[];
}
export default class FileUploader extends React.PureComponent<Props, {}> {
    constructor(props: any);
    componentDidMount(): void;
    onUploadSuccess: (result: any, file: any, xhr: any) => void;
    render(): JSX.Element;
}
export {};
