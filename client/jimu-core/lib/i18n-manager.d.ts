export default class I18NManager {
    static instance: I18NManager;
    static getInstance(): I18NManager;
    loadNls(nlsModle: string): Promise<any>;
}
