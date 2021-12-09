import {
  global_palette_black_400,
  global_palette_blue_300,
  global_palette_gold_300,
  global_palette_green_300,
  global_palette_red_100,
} from '@patternfly/react-tokens';

export const categoryColor = {
  ok: global_palette_green_300.value,
  passed: global_palette_green_300.value,
  unreachable: global_palette_black_400.value,
  unfinished: global_palette_black_400.value,
  changed: global_palette_gold_300.value,
  error: global_palette_black_400.value,
  failed: global_palette_red_100.value,
  skipped: global_palette_blue_300.value,
};
