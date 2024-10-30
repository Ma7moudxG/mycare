import {DataTable} from '@/components/table/DataTable'
import StatCard from '@/components/StatCard'
import { getReacentAppointmentList } from '@/lib/actions/appointment.actions'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {columns} from '@/components/table/columns'
import { Button } from '@/components/ui/button'
import AddClientButton from '@/components/AddClientButton'


const Admin = async () => {
    const appointments = await getReacentAppointmentList()
  return (
    <div className='mx-auto flex max-w-7xl flex-col space-y-14'>
        <header className='admin-header'>
            <Link href="/" className='cursor-pointer'>
                <Image 
                    src="/assets/icons/present-orig-logo-w.png"
                    height={200}
                    width={200}
                    alt="logo"
                    className='h-8 w-fit'
                />
            </Link>
            <p className='text-16-semibold'>Admin Dashboard</p>
        </header>

        <main className='admin-main'>
            <section className='w-full space-y-4 flex justify-between'>
                <div>
                    <h1 className='header'>Welcome, Admin</h1>
                    <p className='text-dark-700'>Start managing Digital Factory Present clients</p>
                </div>
                <div>
                    <AddClientButton />
                    
                </div>
            </section>

            <section className='admin-stat'>
                <StatCard 
                    type="appointments"
                    count={appointments.scheduledCount}
                    label="Active Clients"
                    icon="/assets/icons/appointments.svg"
                />
                <StatCard 
                    type="pending"
                    count={appointments.pendingCount}
                    label="Pending Clients"
                    icon="/assets/icons/pending.svg"
                />
                <StatCard 
                    type="cancelled"
                    count={appointments.cancelledCount}
                    label="Cancelled Clients"
                    icon="/assets/icons/cancelled.svg"
                />
            </section>

            <DataTable columns={columns} data={appointments.documents}/>
        </main>
    </div>
  )
}

export default Admin