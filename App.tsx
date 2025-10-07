import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useState } from 'react';
import Dashboard from './components/Dashboard';
import MyPage from './components/MyPage';
import StreamerMode from './components/StreamerMode';
import ViewerMode from './components/ViewerMode';
import type { AppMode } from './types';


const pageVariants = {
  initial: { opacity: 0, x: 390 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -390 },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5,
};

function App() {
  const [mode, setMode] = useState<AppMode>('dashboard');
  const [selectedStreamId, setSelectedStreamId] = useState<string | null>(null);

  const handleStartStream = useCallback(() => setMode('streamer'), []);
  const handleSelectStream = useCallback((id: string) => {
    setSelectedStreamId(id);
    setMode('viewer');
  }, []);
  const handleNextStream = useCallback((id: string) => {
    setSelectedStreamId(id);
  }, []);
  const handleGoToMyPage = useCallback(() => setMode('mypage'), []);
  const handleGoToDashboard = useCallback(() => setMode('dashboard'), []);

  const renderContent = () => {
    switch (mode) {
      case 'dashboard':
        return (
          <motion.div
            key="dashboard"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
            className="h-full"
          >
            <Dashboard
              onStartStream={handleStartStream}
              onSelectStream={handleSelectStream}
              onGoToMyPage={handleGoToMyPage}
            />
          </motion.div>
        );
      case 'streamer':
        return (
          <motion.div
            key="streamer"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
            className="h-full"
          >
            <StreamerMode
              onStop={handleGoToDashboard}
              onGoToMyPage={handleGoToMyPage}
            />
          </motion.div>
        );
      case 'viewer':
        return (
          <motion.div
            key={`viewer-${selectedStreamId}`}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
            className="h-full"
          >
            <ViewerMode
              streamId={selectedStreamId!}
              onExit={handleGoToDashboard}
              onNextStream={handleNextStream}
            />
          </motion.div>
        );
      case 'mypage':
        return (
          <motion.div
            key="mypage"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
            className="h-full"
          >
            <MyPage onBack={handleGoToDashboard} />
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-black text-white font-sans overflow-hidden antialiased flex justify-center items-center h-screen">
      {/* モバイル: iPhone枠、PC: フルスクリーン */}
      <div className="relative mx-auto w-full h-full sm:max-w-[390px] sm:max-h-[844px] sm:border-4 sm:border-gray-800 sm:rounded-[40px] sm:shadow-2xl">
         <div className="absolute top-0 left-0 w-full h-full overflow-hidden sm:rounded-[36px]">
            <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
         </div>
      </div>
    </div>
  );
}

export default App;