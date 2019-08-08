import { ServiceInfo } from './types/common';
export default class ServiceManager {
    static instance: ServiceManager;
    static getInstance(): ServiceManager;
    private servicesInfo;
    private servicesInfoPromise;
    getServiceInfo(url: string): ServiceInfo;
    setServiceInfo(url: string, info: ServiceInfo): void;
    fetchServiceInfo(url: string): Promise<any>;
    isHostedServiceInSamePortal(url: string): Promise<boolean>;
    /**
     * return true if it's hosted service
     * @param url
     */
    isHostedService(url: string): Promise<boolean>;
}
