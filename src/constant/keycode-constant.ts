export const LEFT_MARK_UNICODE = 10096

export const LEFT_MARK_CHAR = String.fromCharCode(LEFT_MARK_UNICODE)

export const RIGHT_MARK_UNICODE = 10097

export const RIGHT_MARK_CHAR = String.fromCharCode(RIGHT_MARK_UNICODE)

export const BACKSPACE_KEYCODE = 8

export const DELETE_KEYCODE = 46

export const CTRL_X_CUT_KEYCODE = 1114200

export const CTRL_V_COPY_KEYCODE = 1114129

export const CTRL_Z_ROLLBACK = 1114202

export const CTRL_SHIFT_LEFT = 3342373

export const CTRL_SHIFT_UP = CTRL_SHIFT_LEFT + 1

export const CTRL_SHIFT_RIGHT = CTRL_SHIFT_LEFT + 2

export const CTRL_SHIFT_DOWN = CTRL_SHIFT_LEFT + 3

export const CTRL_A = 1114177

export const CTRL_C = 1114179

export const ENTER = 13

export const SHIFT = 16

export const CTRL = 17

export const ALT = 18

export const PAUSE = 19

export const CAPS_LOCK = 20

export const ESC = 27

export const END = 35

export const HOME = 36

export const SHIFT_CTRL_0 = 1114129

export const SHIFT_CTRL_1 = 3342352

export const LEFT = 37

export const UP = 38

export const RIGHT = 39

export const DOWN = 40

export const WIN_0 = 91

export const WIN_1 = 91

export const F1 = 112

export const F2 = 113

export const F3 = 114

export const F4 = 115

export const F5 = 116

export const F6 = 117

export const F7 = 118

export const F8 = 119

export const F9 = 120

export const F10 = 121

export const F11 = 122

export const F12 = 123

export const NUM_LOCK = 144

export const SCROLL_LOCK = 145

export const SHIFT_LEFT = 2228261

export const SHIFT_UP = SHIFT_LEFT + 1

export const SHIFT_RIGHT = SHIFT_LEFT + 2

export const SHIFT_DOWN = SHIFT_LEFT + 3

export const SHIFT_HOME = 2228260

export const SHIFT_END = 2228259

export const ENABLE_EDITOR_KEY_CODES = [
  DOWN, DELETE_KEYCODE, BACKSPACE_KEYCODE, LEFT, UP, RIGHT, HOME, END,
  CTRL_X_CUT_KEYCODE, CTRL_Z_ROLLBACK,
  SHIFT_LEFT, SHIFT_RIGHT, SHIFT_UP, SHIFT_DOWN,
  CTRL_A, CTRL_C,
  CTRL_SHIFT_UP, CTRL_SHIFT_LEFT, CTRL_SHIFT_DOWN, CTRL_SHIFT_RIGHT,
  SHIFT_END, SHIFT_HOME
]

export const ALLOW_SELECTED_HTML_KEYCODES = [
  // tab
  9,
  // shift
  SHIFT,
  // ctrl
  CTRL,
  // ctrl + shift
  SHIFT_CTRL_0, SHIFT_CTRL_1,
  // alt
  ALT,
  // pause/break
  PAUSE,
  // caps lock
  CAPS_LOCK,
  // escape
  ESC,
  // end
  END,
  // home
  HOME,
  // left, up, right, down arrow
  LEFT, UP, RIGHT, DOWN,
  // window key
  WIN_0, WIN_1,
  // f1 ~ f12
  F1, F2, F3, F4, F5, F6, F7, F8, F9, F10, F11, F12,
  // number lock
  NUM_LOCK,
  // scroll lock
  SCROLL_LOCK
]
