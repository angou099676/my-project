import './App.css'
import { Button } from './components/ui/button'
import { useToast } from './hooks/toast'

function App() {
  const { addToast } = useToast()

  return (
    <>
      <h1 className='text-red-500'>Vite + React</h1>
      <Button type="button" onClick={() => {
        addToast({
          message: "Success",
          varient: "success",
          position: "bottom-right"
        })
      }}>Login</Button>
      <div className='tex'>

      </div>
    </>
  )
}

export default App
