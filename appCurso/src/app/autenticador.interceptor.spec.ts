import { TestBed } from '@angular/core/testing';

import { AutenticadorInterceptor } from './autenticador.interceptor';

describe('AutenticadorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AutenticadorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AutenticadorInterceptor = TestBed.inject(AutenticadorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
