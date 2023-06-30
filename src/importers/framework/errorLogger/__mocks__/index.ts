import { UserInfo } from '@/components/utils/props';
import { LogContext } from '@/utils/gatherLogging';

class MockErrorLogger {
  captureException(_: unknown, __?: LogContext) {}
  setUserContext(_?: UserInfo) {}
}

export default new MockErrorLogger();
