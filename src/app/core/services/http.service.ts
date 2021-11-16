import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgAuthService } from '@appstrax/ng-auth';

@Injectable()
export class HttpService {
  constructor(
    private httpClient: HttpClient,
    private ngAuth: NgAuthService,
    // @Inject(PLATFORM_ID) private platformId: Object
  ) {

  }

  public post(url: string, body: any, apiKey?: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient.post(url, body, this.getHeaders(apiKey)).subscribe(
        (response) => resolve(response),
        (err) => reject(err)
      );
    });
  }

  public put(url: string, body: any, apiKey?: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient.put(url, body, this.getHeaders(apiKey)).subscribe(
        (response) => resolve(response),
        (err) => reject(err)
      );
    });
  }

  public patch(url: string, body: any, apiKey?: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient.patch(url, body, this.getHeaders(apiKey)).subscribe(
        (response) => resolve(response),
        (err) => reject(err)
      );
    });
  }

  public get(url: string, apiKey?: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient.get(url, this.getHeaders(apiKey)).subscribe(
        (response) => resolve(response),
        (err) => reject(err)
      );
    });
  }

  public delete(url: string, apiKey?: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient.delete(url, this.getHeaders(apiKey)).subscribe(
        (response) => resolve(response),
        (err) => reject(err)
      );
    });
  }

  public getText(url: string, apiKey?: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const headers: any = this.getHeaders(apiKey);
      headers.responseType = 'text';

      this.httpClient.get(url, headers).subscribe(
        (response) => resolve(response),
        (err) => reject(err)
      );
    });
  }

  public getHeaders(apiKey?: string): { headers: any } {
    let headers = new HttpHeaders();

    // headers = headers.append('X-Api-Key', apiKey || environment.apiKey);
    // headers = headers.append('X-Api-User-Id', apiKey || environment.apiKey);
    // if (isPlatformServer(this.platformId)) {
    //   return { headers }
    // } else {
    if (this.ngAuth.getAuthToken()) {
      //   headers = headers.append('X-User-Auth-Token', this.ngAuth.getAuthToken());
      headers = headers.append('Authorization', 'Bearer ' + this.ngAuth.getAuthToken());
    }
    // }
    return { headers };
  }
}
