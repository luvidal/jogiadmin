import { JSX } from 'react';
import Cloud from '../ui_cloud';
import Tasks from '../ui_tasks';

const pagesById: { [key: string]: (props?: any) => JSX.Element } = {
  cloud: () => <Cloud />,
  tasks: () => <Tasks />,
}

interface Props {
  selected: string
}

const Content = ({ selected }: Props) =>
  <div className='w-screen h-full overflow-hidden flex flex-col'>
    <div className='flex-grow flex justify-center overflow-hidden'>
      <div className='flex flex-col w-full md:w-1/2 lg:my-12 overflow-hidden lg:border rounded'>
        {
          pagesById[selected]
            ? pagesById[selected]()
            : <div>Not found: {selected}</div>
        }
      </div>
    </div>
  </div>

export default Content
