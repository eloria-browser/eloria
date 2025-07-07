import {
  HiOutlineArrowPath,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlinePlus,
  HiOutlinePuzzlePiece,
  HiOutlineXCircle,
  HiOutlineXMark
} from 'solid-icons/hi'
import { Index, splitProps } from 'solid-js'
import { cn } from './lib/utils'
import { TbUserEdit } from 'solid-icons/tb'
import { RiMediaFullscreenLine } from 'solid-icons/ri'
import BrowserIcon from './assets/images/browser.png'

const ControlButton = (props) => {
  const [{ icon: Icon }, others] = splitProps(props, ['icon'])

  return (
    <button
      {...others}
      class={cn(
        'shrink-0',
        'cursor-pointer',
        'size-8 rounded-full',
        'bg-neutral-100 hover:bg-neutral-200',
        'dark:bg-neutral-700 dark:hover:bg-neutral-600',
        'flex justify-center items-center',
        props.class
      )}
    >
      <Icon class="size-4" />
    </button>
  )
}

const ControlInput = (props) => {
  return (
    <input
      {...props}
      class={cn(
        'size-8 rounded-full',
        'bg-neutral-100 dark:bg-neutral-700',
        'w-full px-2',
        'outline-0 focus:ring-2 focus:ring-blue-500',
        props.class
      )}
    />
  )
}

const TabButton = (props) => {
  return (
    <div
      class={cn(
        props.active && 'bg-neutral-100 dark:bg-neutral-700',
        'cursor-pointer',
        'p-1 rounded-full shrink-0',
        'flex gap-2 items-center',
        'cursor-pointer'
      )}
    >
      {/* Icon */}
      <img src={BrowserIcon} class="size-6 rounded-full" />

      {/* Title */}
      <h1 class={cn('font-bold', 'max-w-10 truncate')}>{'New Tab'}</h1>

      {/* Close Button */}
      <button
        class={cn(
          props.active && 'bg-neutral-200 dark:bg-neutral-600',
          'p-1 rounded-full',
          'flex items-center justify-center',
          'cursor-pointer'
        )}
      >
        <HiOutlineXMark class="size-4" />
      </button>
    </div>
  )
}

function App() {
  return (
    <div
      class={cn(
        'flex flex-col',
        'divide-y divide-neutral-200 dark:divide-neutral-700',
        'h-screen w-screen'
      )}
    >
      {/* Account Bar */}
      <div class="flex gap-1 items-center p-1">
        <div class="flex gap-1">
          <ControlButton icon={HiOutlinePuzzlePiece} />
          <ControlButton icon={RiMediaFullscreenLine} />
        </div>

        <h1 class="grow min-w-0 text-center font-bold text-blue-500">Account 1</h1>

        <div class="flex gap-1">
          <ControlButton icon={TbUserEdit} />
          <ControlButton icon={HiOutlineXCircle} />
        </div>
      </div>

      {/* Tabs */}
      <div class={cn('w-full relative', 'flex items-center pr-1', 'overflow-x-scroll')}>
        {/* Main */}
        <div class="sticky left-0 py-1 px-1 bg-white dark:bg-neutral-800 shrink-0">
          <ControlButton icon={HiOutlinePlus} />
        </div>

        {/* Tab Buttons */}
        <div class="flex gap-1 flex-nowrap shrink-0 grow min-w-0 min-h-0">
          <Index each={Array.from({ length: 20 })}>
            {(_, index) => <TabButton active={index === 1} />}
          </Index>
        </div>
      </div>

      {/* Address Bar */}
      <div class="flex gap-1 items-center p-1">
        <div class="flex gap-1">
          <ControlButton icon={HiOutlineChevronLeft} />
          <ControlButton icon={HiOutlineChevronRight} />
        </div>

        <ControlInput placeholder="Search or enter URL" class="grow min-w-0 min-h-0" />

        <ControlButton icon={HiOutlineArrowPath} />
      </div>
    </div>
  )
}

export default App
