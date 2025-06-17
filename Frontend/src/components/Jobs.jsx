import React, { useEffect, useState } from 'react'
import FilterCard from './FilterCard'
import { useSelector } from 'react-redux';
import Job from './Job'
import Navbar from './shared/Navbar';
import { motion } from 'framer-motion';


export const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);

    const uniqueLocations = [...new Set(allJobs.map(job => job.location))];
    const uniqueCompanies = [...new Set(allJobs.map(job => job.company?.name).filter(Boolean))];
    const salaryRanges = [
        "1-5 LPA",
        "5-10 LPA",
        "10-15 LPA",
        "15-20 LPA",
        "20-25 LPA",
        "25-30 LPA",
        "30+ LPA"
    ];

    const matchSalary = (jobSalary, selectedRange) => {
        if (typeof jobSalary !== 'number') return false;

        if (selectedRange === "30+ LPA") {
            return jobSalary >= 30;
        }

        const match = selectedRange.match(/^(\d+)-(\d+) LPA$/);
        if (match) {
            const min = parseInt(match[1]);
            const max = parseInt(match[2]);
            return jobSalary >= min && jobSalary <= max;
        }

        return false;
    };
    useEffect(() => {
        if (searchedQuery) {
            const filteredJobs = allJobs.filter((job) => {
                const matchesLocation = job.location === searchedQuery;
                const matchesCompany = job.company?.name === searchedQuery;

                // Convert salary (assumed to be annual in LPA) from number
                const salaryInLPA = job.salary;
                const matchesSalary = matchSalary(salaryInLPA, searchedQuery);

                return matchesLocation || matchesCompany || matchesSalary;
            });
            setFilterJobs(filteredJobs);
        } else {
            setFilterJobs(allJobs);
        }
    }, [allJobs, searchedQuery]);



    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-5'>
                <div className='flex gap-5'>
                    <div className='w-20%'>
                        <FilterCard
                            locations={uniqueLocations}
                            companies={uniqueCompanies}
                            salaryRanges={salaryRanges}
                        />
                    </div>
                    {
                        filterJobs.map((job) => (
                            <motion.div
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                transition={{ duration: 0.3 }}
                                key={job?._id}>
                                <Job job={job} />
                            </motion.div>
                        ))
                    }
                </div>
            </div>


        </div>
    )
}

export default Jobs