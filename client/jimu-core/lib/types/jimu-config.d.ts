export default interface JimuConfig {
    isInPortal: boolean;
    mountPath: string;
    rootPath: string;
    packagesInAppFolder: boolean;
    useStructuralUrl: boolean;
    locale: string;
    /** Whether the app is builder or app */
    isBuilder: boolean;
    /** Whether the app is in builder or not */
    isInBuilder: boolean;
}
