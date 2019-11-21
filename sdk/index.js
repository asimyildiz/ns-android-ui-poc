import DesktopVodService from './vendors/desktop/services/DesktopVodService';
import BootManager from './managers/common/BootManager';
import DesktopVolumeService from './vendors/desktop/services/DesktopVolumeService';
import VodManager from './managers/vod/VodManager';
import DesktopChannelService from './vendors/desktop/services/DesktopChannelService';
import DesktopProgramService from './vendors/desktop/services/DesktopProgramService';

const vodService = new DesktopVodService();
const bootManager = new BootManager();
const volumeService = new DesktopVolumeService();
const vodManager = new VodManager();
const channelService = new DesktopChannelService();
const programService = new DesktopProgramService();
export default {
    vodService,
    bootManager,
    volumeService,
    vodManager,
    channelService,
    programService
};
