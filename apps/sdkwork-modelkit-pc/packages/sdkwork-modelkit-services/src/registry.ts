import { rootContainer } from '@sdkwork/modelkit-core';
import { IAgentServiceToken } from './agent/interface';
import { LocalAgentService } from './agent/service';
import { IResourcesServiceToken } from './resources/interface';
import { LocalResourcesService } from './resources/service';
import { IAccountServiceToken } from './account/interface';
import { LocalAccountService } from './account/service';
import { ISystemServiceToken } from './system/interface';
import { LocalSystemService } from './system/service';
import { IUserServiceToken } from './user/interface';
import { LocalUserService } from './user/service';

/**
 * Bootstraps all service implementations into the DI container.
 */
export function registerServices() {
  rootContainer.register(IAgentServiceToken, new LocalAgentService());
  rootContainer.register(IResourcesServiceToken, new LocalResourcesService());
  rootContainer.register(IAccountServiceToken, new LocalAccountService());
  rootContainer.register(ISystemServiceToken, new LocalSystemService());
  rootContainer.register(IUserServiceToken, new LocalUserService());
}
