import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  /**
   * Открыть URL во внутреннем браузере (Custom Tabs / SFSafariViewController)
   * Возвращает Promise<boolean> — true при успешном открытии
   */
  open(url: string): Promise<boolean>;
}

// Получаем нативный модуль с нужным интерфейсом
export default TurboModuleRegistry.getEnforcing<Spec>('Auth20Twitch');
