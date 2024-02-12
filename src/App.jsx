import { useState } from 'react'
import Header from './components/Header.jsx';
import MainDetails from './components/MainDetails';
import ClientDetails from './components/ClientDetails';
import Dates from './components/Dates';
import Table from './components/Table';
import Notes from './components/Notes';
import Footer from './components/Footer';

function App() {

  const [showInvoice,setShowInvoice]=useState(false);
  const [clientName, setClientName] = useState('');
  const [clientAddress, setClientAddress] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [clientGst, setClientGst] = useState('');
  const [clientPos, setClientPos] = useState('');
  const [clientState, setClientState] = useState('');
  const [clientStateCode, setClientStateCode] = useState('');
  const [invoiceDate, setInvoiceDate] = useState('');

  const handlePrint = () =>{
    window.print();
  }

  return (
    <>
      <main className="m-5 p-5 xl:max-w-4xl xl:mx-auto bg-white rounded shadow">
        {
          showInvoice 
          ?
          <div>
            <Header handlePrint={handlePrint}/>
            <MainDetails/>
            <ClientDetails clientName={clientName} clientAddress={clientAddress} clientGst={clientGst} clientPos={clientPos} clientState={clientState} clientStateCode={clientStateCode}/>
            <Dates invoiceNo={invoiceNumber} invoiceDate={invoiceDate} />
            <Table/>
            <Notes/>
            <Footer />
            <div className='flex justify-center'>
              <button onClick={()=>setShowInvoice(false)} className="mt-5 bg-blue-500 text-white font-bold py-2 px-8 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300">Edit Information</button>
            </div>
        </div>
        :
        <>

        {/*Invoice Number, Client Name, Address, State, POS, Customer GST, Date, Product Details(Name, KG, Rate, Discount) */}
          {/* Name, Address, email, phone, bank name, bank account number, website, client name, client address, invoice number, incouce date, notes */}
          <div className="flex flex-col justify-center">
            <h2 className='font-bold text-3xl mb-5'>Add Invoice Details</h2>
            <label htmlFor='invoiceNo'>Invoice No</label>
            <input type='no' name='text' id='invoiceNo' className='mb-3' placeholder='Invoice No' autoComplete='off' value={invoiceNumber} onChange={(e)=> setInvoiceNumber(e.target.value)}/>

            <label htmlFor='clientName'>Client Name</label>
            <input type='text' name='text' id='clientName'className='mb-3' placeholder='Enter Your Client Name' autoComplete='off' value={clientName} onChange={(e)=> setClientName(e.target.value)}/>  
            
            <label htmlFor='address'>Client Address</label>
            <input type='text' name='text' id='address' className='mb-3' placeholder='Enter address' autoComplete='off' value={clientAddress} onChange={(e)=> setClientAddress(e.target.value)}/>

            <label htmlFor='gst'>Client GST</label>
            <input type='text' name='text' id='gst' className='mb-3' placeholder='Enter gst' autoComplete='off' value={clientGst} onChange={(e)=> setClientGst(e.target.value)}/>

            <label htmlFor='pos'>Client POS</label>
            <input type='text' name='text' id='pos' className='mb-3' placeholder='Enter pos' autoComplete='off' value={clientPos} onChange={(e)=> setClientPos(e.target.value)}/> 

            <label htmlFor='state'>Client State</label>
            <input type='text' name='text' id='state' className='mb-3' placeholder='Enter State' autoComplete='off' value={clientState} onChange={(e)=> setClientState(e.target.value)}/> 

            <label htmlFor='stateCode'>Client State Code</label>
            <input type='text' name='text' id='stateCode' className='mb-3' placeholder='Enter State Code' autoComplete='off' value={clientStateCode} onChange={(e)=> setClientStateCode(e.target.value)}/>

            <label htmlFor='invoiceDate'>Invoice Date</label>
            <input type='date' name='text' id='invoiceDate' className='mb-3' placeholder='Enter Invoice Date' autoComplete='off' value={invoiceDate} onChange={(e)=> setInvoiceDate(e.target.value)}/>  
            
            
            <button onClick={()=>setShowInvoice(true)} className="bg-blue-500 text-white font-bold py-2 px-8 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300">Preview Invoice</button>
          </div>
        </>
      }
      </main>
    </>
  )
}

export default App
