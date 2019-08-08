import { UserSession, ICredential } from '@esri/arcgis-rest-auth';
import { HostAuthListenMessage } from './post-message';
export default class SessionManager {
    static instance: SessionManager;
    private _session;
    private _waitingForHostAuth;
    private _setSession;
    private _clearSession;
    static getInstance(): SessionManager;
    constructor();
    getUserInfo(): Promise<void | import("@esri/arcgis-rest-auth").IUser>;
    getSession(): UserSession;
    /**
     * After get portal self, the portalUrl may change, such as:
     * from `www.arcgis.com` to `esridevbeijing.maps.arcgis.com`
     * @param portalUrl
     */
    setPortalUrl(portalUrl: string): void;
    /**
     * because when init from cookie, the client id may be null, so set here
     * @param clientId
     */
    setClientId(clientId: string): void;
    setSession(session: UserSession): void;
    /**
     * because there is no clientId in esri_auth, so pass in here
     * @param clientId
     */
    initFromCookie(clientId: string): void;
    private getSessionFromCookie;
    private checkCookie;
    readCookie(): string[];
    private writeCookie;
    private removeCookie;
    initFromCredential(credential: ICredential): void;
    signIn(fromUrl?: string): Promise<void> | Promise<UserSession>;
    handleAuthError(error: any): Promise<never>;
    signOut(): void;
    syncHostAuth(message: HostAuthListenMessage): void;
}
