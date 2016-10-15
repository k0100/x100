import { RestoredWindowState } from './restored-window-state';
import { ExpandedWindowState } from './expanded-window-state';
import { MinimizedWindowState } from './minimized-window-state';
import { WindowStateBase } from './window-state-base';

export class WindowState {
	public static Minimized: MinimizedWindowState = new MinimizedWindowState();
	public static Restored: RestoredWindowState = new RestoredWindowState();
	public static Expanded: ExpandedWindowState = new ExpandedWindowState();

	public static FromValue(value: number):WindowStateBase {
		switch (value) {
			case 0:
				return WindowState.Minimized;
			case 1:
				return WindowState.Restored;	
			case 2:
				return WindowState.Expanded;	
		}
	}
}