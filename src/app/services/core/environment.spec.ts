import {TestBed, waitForAsync} from '@angular/core/testing';

import {EnvironmentService} from './enviroment.service';
import {Environment} from '@angular/cli/lib/config/workspace-schema';
import {ENVIRONMENT} from '../../injection-tokens/environment.token';

describe('EnvironmentService', () => {
  let service: EnvironmentService;
  const environment = {};

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        EnvironmentService,
        {
          provide: Environment,
          useValue: environment
        },
        {
          provide: ENVIRONMENT,
          useValue: environment
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    service = TestBed.inject(EnvironmentService);
  })

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should return environment object', () => {
    expect(service.getEnvironment()).toBeTruthy();
  })
});
