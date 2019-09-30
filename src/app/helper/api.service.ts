import { Injectable } from '@angular/core';
import { LedgerHelper } from './ledgerhelper';
import axios, { AxiosResponse } from 'axios';

@Injectable({
    providedIn: 'root'
})

export class ApiService {

    private axiosInstance;

    constructor(private ledgerHelper: LedgerHelper) {
        // console.log('-url-' + ledgerHelper.baseURL);
        this.axiosInstance = axios.create({
            baseURL: ledgerHelper.baseURL,
            timeout: 1000000
        });

    }

    private errorHandler(message: string) {
        console.log(`The API responded with an error.\n${message}`);
    }

    private checkTokenSet(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.axiosInstance.defaults.headers.common['Authorization'] =
                'Bearer ' + this.ledgerHelper.token;
            resolve();
        });
    }

    public signUp(signup): Promise<string> {
        console.log('signup called ' + JSON.stringify(signup));

        return new Promise(async (resolve, reject) => {
            await this.checkTokenSet();

            this.axiosInstance
                .post(this.ledgerHelper.signUpUrl, signup)
                .then((resp: any) => {
                    resolve(resp);
                })
                .catch((err: Error) => {

                    this.errorHandler(err.message);
                    reject(err);
                });
        });

    }

    public login(login): Promise<string> {
        console.log('login called ' + JSON.stringify(login));

        return new Promise((resolve, reject) => {
            this.axiosInstance
                .post(this.ledgerHelper.loginUrl, login)
                .then((token: AxiosResponse<any>) => {
                    this.axiosInstance.defaults.headers.common['Authorization'] =
                        'Bearer ' + token.data;

                    resolve(token.data as string);
                })
                .catch((err: Error) => {

                    this.errorHandler(err.message);
                    reject(err);
                });
        });

    }

    public logout(token: string): Promise<string> {
        console.log('logout called ' + token);

        return new Promise(async (resolve, reject) => {
            await this.checkTokenSet();

            this.axiosInstance
                .get(this.ledgerHelper.logoutUrl + token)
                .then(() => {
                    resolve();
                })
                .catch((err: Error) => {

                    this.errorHandler(err.message);
                    reject(err);
                });
        });

    }

    // public write(data: string): Promise<string> {

    //     const headers = {
    //         'Content-Type': 'application/octet-stream',
    //         'accept': 'application/json',
    //         'Authorization': 'Bearer '+ this.ledgerHelper.token
    //       }


    //       console.log('write called ' + data +' headers '+ JSON.stringify(headers));


    //     return new Promise(async (resolve, reject) => {
    //         await this.checkTokenSet();

    //         this.axiosInstance
    //         .post(this.ledgerHelper.writeFileUrl, data, { headers: headers})
    //         .then((resp: AxiosResponse<any>) => {
    //             resolve(resp.data.reference as string);
    //         })
    //         .catch((err: Error) => {

    //             this.errorHandler(err.message);
    //             reject(err);
    //         });
    //     });

    // }

    public write(data: string): Promise<string> {

        const headers = {
            'Content-Type': 'application/octet-stream',
            'accept': 'application/json',
            'Authorization': 'Bearer ' + this.ledgerHelper.token
        }


        console.log('write called ' + data + ' headers ' + JSON.stringify(headers));


        return new Promise(async (resolve, reject) => {
            await this.checkTokenSet();

            this.axiosInstance
                .post(this.ledgerHelper.writeFileUrl, data, { headers: headers })
                .then((resp: AxiosResponse<any>) => {
                    resolve(resp.data.reference as string);
                })
                .catch((err: Error) => {

                    this.errorHandler(err.message);
                    reject(err);
                });
        });

    }

    public read(reference: string): Promise<string> {

        const headers = {
            'Content-Type': 'application/octet-stream',
            'accept': 'application/json',
            'Authorization': 'Bearer ' + this.ledgerHelper.token
        }


        console.log('read called ' + reference + ' headers ' + JSON.stringify(headers));


        return new Promise(async (resolve, reject) => {
            await this.checkTokenSet();

            this.axiosInstance
                .get(this.ledgerHelper.baseURL + "/" + reference, { headers: headers })
                .then((resp: AxiosResponse<any>) => {
                    resolve(resp.data);
                })
                .catch((err: Error) => {

                    this.errorHandler(err.message);
                    reject(err);
                });
        });

    }

    public read_anyone(reference: string, token: string): Promise<string> {

        const headers = {
            'Content-Type': 'application/octet-stream',
            'accept': 'application/json',
            'Authorization': 'Bearer ' + token
        }


        console.log('read called ' + reference + ' headers ' + JSON.stringify(headers));


        return new Promise(async (resolve, reject) => {
            await this.checkTokenSet();

            this.axiosInstance
                .get(this.ledgerHelper.baseURL + "/" + reference, { headers: headers })
                .then((resp: AxiosResponse<any>) => {
                    resolve(resp.data);
                })
                .catch((err: Error) => {

                    this.errorHandler(err.message);
                    reject(err);
                });
        });

    }

    public share(reference: string, recName: string): Promise<string> {

        const headers = {
            accept: 'application/octet-stream',
            Authorization: 'Bearer ' + this.ledgerHelper.token
        }


        console.log('share called ' + reference + ' name ' + recName + ' headers ' + JSON.stringify(headers));


        return new Promise(async (resolve, reject) => {
            await this.checkTokenSet();

            this.axiosInstance
                .get(this.ledgerHelper.shareUrl + '/' + reference + '/' + recName, { headers: headers })
                .then((resp: AxiosResponse<any>) => {
                    resolve(resp.data.share as string);
                })
                .catch((err: Error) => {

                    this.errorHandler(err.message);
                    reject(err);
                });
        });
    }

    public inspect(reference: string): Promise<any> {

        const headers = {
            'Content-Type': 'application/octet-stream',
            'accept': 'application/json',
            'Authorization': 'Bearer ' + this.ledgerHelper.token
        }


        console.log('inspect called ' + reference + ' headers ' + JSON.stringify(headers));


        return new Promise(async (resolve, reject) => {
            await this.checkTokenSet();

            this.axiosInstance
                .get(this.ledgerHelper.inspect + reference, { headers: headers })
                .then((resp: AxiosResponse<any>) => {
                    resolve(resp.data);
                })
                .catch((err: Error) => {

                    this.errorHandler(err.message);
                    reject(err);
                });
        });

    }

    public whoAmI(): Promise<string> {
        console.log('who am i called ' + this.axiosInstance.defaults.headers.common['Authorization']);

        return new Promise(async (resolve, reject) => {
            await this.checkTokenSet();

            this.axiosInstance
                .get(this.ledgerHelper.whoAmIUrl,
                    { headers: { 'Authorization': `Bearer ${this.ledgerHelper.token}` } }
                )
                .then((resp: any) => {
                    resolve(resp.data);
                })
                .catch((err: Error) => {
                    this.errorHandler(err.message);
                    reject(err);
                });
        });

    }

    public changePasswordSelf(changePasswordData: any): Promise<void> {
        return new Promise(async (resolve, reject) => {
            await this.checkTokenSet();

            this.axiosInstance
                .post(this.ledgerHelper.changePasswordUrl, changePasswordData)
                .then((resp: any) => {
                    resolve(resp);
                })
                .catch((err: unknown) => {
                    reject(err);
                });
        });
    }

    public forgotPassword(email: string): Promise<void> {
        return new Promise(async (resolve, reject) => {
            await this.checkTokenSet();

            this.axiosInstance
                .get(this.ledgerHelper.forgotPasswordUrl + email)
                .then(() => {
                    resolve();
                })
                .catch((err: any) => {
                    reject(err.response);
                });
        });
    }

    public resetPassword(passwordResetData: any): Promise<void> {
        return new Promise(async (resolve, reject) => {
            this.axiosInstance
                .post(this.ledgerHelper.resetPasswordUrl, passwordResetData)
                .then(() => {
                    resolve();
                })
                .catch((err: any) => {
                    reject(err.response);
                });
        });
    }


}