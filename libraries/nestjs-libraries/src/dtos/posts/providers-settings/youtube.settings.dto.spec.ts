import { validate } from 'class-validator';
import { YoutubeSettingsDto } from './youtube.settings.dto';

describe('YoutubeSettingsDto playlistId', () => {
  it('rejects a YouTube post without a playlist', async () => {
    const settings = Object.assign(new YoutubeSettingsDto(), {
      title: 'Episode 2',
      type: 'public',
      tags: [],
    });

    const errors = await validate(settings);

    expect(errors.some((error) => error.property === 'playlistId')).toBe(true);
  });

  it('accepts a resolved playlist id', async () => {
    const settings = Object.assign(new YoutubeSettingsDto(), {
      title: 'Episode 2',
      type: 'public',
      playlistId: 'PL123',
      tags: [],
    });

    const errors = await validate(settings);

    expect(errors.filter((error) => error.property === 'playlistId')).toEqual(
      []
    );
  });
});
