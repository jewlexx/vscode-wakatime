import * as fs from 'fs';
import * as os from 'os';

export class Dependencies {
  public static getHomeDirectory(): string {
    let home = process.env.WAKATIME_HOME;
    if (home && home.trim() && fs.existsSync(home.trim())) return home.trim();
    if (Dependencies.isPortable()) return process.env['VSCODE_PORTABLE'] as string;
    return process.env[Dependencies.isWindows() ? 'USERPROFILE' : 'HOME'] || process.cwd();
  }

  public static isWindows(): boolean {
    return os.platform() === 'win32';
  }

  public static isPortable(): boolean {
    return !!process.env['VSCODE_PORTABLE'];
  }

  public buildOptions(): Object {
    const options = {
      windowsHide: true,
    };
    if (!Dependencies.isWindows() && !process.env.WAKATIME_HOME && !process.env.HOME) {
      options['env'] = { ...process.env, WAKATIME_HOME: Dependencies.getHomeDirectory() };
    }
    return options;
  }
}
