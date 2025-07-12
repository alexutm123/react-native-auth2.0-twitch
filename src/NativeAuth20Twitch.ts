import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  /**
   * Opens the given URL in the internal browser (Custom Tabs / SFSafariViewController)
   * Returns a Promise<boolean> with true if the URL was opened successfully
   */
  open(url: string): Promise<boolean>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('Auth20Twitch');
