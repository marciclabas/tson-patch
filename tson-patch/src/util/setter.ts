import { Path, At, Key } from "../types/index.js";
import { set } from "../apply.js";

/** Makes a lens setter function. Specially useful for React's `setState`. E.g:
 * 
 * ```jsx
 * type Config = {
 *   theme: 'light' | 'dark',
 *   text: {
 *     size: 's' | 'm' | 'l',
 *   }
 * }
 * 
 * const [config, setConfig] = useState<Config>({...})
 * 
 * const configSetter = tp.setter(setConfig)
 * 
 * <MyThemeSwitch setTheme={configSetter(['theme'])} />
 * <MyFontSizeSelector setSize={configSetter(['text', 'size'])} />
 * ```
 */
export const setter = <T extends object>(
  setter: (f: (x: T) => T) => void,
) => <P extends Key[]>(
  path: P extends Path<T, P> ? P : Path<T, P>,
): (val: At<T, P>) => void => (
  val => setter(x => set(x, path as any, val))
)
