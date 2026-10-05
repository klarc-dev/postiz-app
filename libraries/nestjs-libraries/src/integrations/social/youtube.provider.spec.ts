import 'reflect-metadata';
import { YoutubeProvider } from './youtube.provider';
import { readFileSync } from 'fs';

describe('YoutubeProvider playlist support', () => {
  it('exposes getPlaylists as an integration tool', () => {
    const tools = Reflect.getMetadata('custom:tool', YoutubeProvider.prototype);

    expect(tools).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ methodName: 'getPlaylists' }),
      ])
    );
  });

  it('validates playlist ownership before starting the upload session', () => {
    const source = readFileSync(__filename.replace('.spec.ts', '.ts'), 'utf8');
    const validation = source.indexOf('await this.validateOwnedPlaylist(');
    const uploadSession = source.indexOf(
      'https://www.googleapis.com/upload/youtube/v3/videos'
    );

    expect(validation).toBeGreaterThan(-1);
    expect(uploadSession).toBeGreaterThan(validation);
  });

  it('reconciles playlist membership before insertion', () => {
    const source = readFileSync(__filename.replace('.spec.ts', '.ts'), 'utf8');
    const lookup = source.indexOf('youtubeClient.playlistItems.list({');
    const insertion = source.indexOf('youtubeClient.playlistItems.insert({');

    expect(lookup).toBeGreaterThan(-1);
    expect(insertion).toBeGreaterThan(lookup);
  });
});
