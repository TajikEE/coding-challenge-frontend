import { Resolution } from '../data-types/resolution';
import { readResolutionsFile } from './readFiles';

export function getResolutionById(id: string): Resolution | undefined {
    const resolutions = readResolutionsFile();

    return resolutions.find(
        (resolution: Resolution) => resolution.identifier === id
    );
}
