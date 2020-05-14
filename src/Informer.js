import React, { useState, useEffect, useMemo } from 'react'
import styled from 'styled-components'
import { Table } from './Table'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const Styles = styled.div`
    padding: 1rem;

    table {
        border-spacing: 0;
        border: 1px solid black;

        tr {
            :last-child {
                td {
                    border-bottom: 0;
                }
            }
        }

        th,
        td {
            margin: 0;
            padding: 0.5rem;
            border-bottom: 1px solid black;
            border-right: 1px solid black;

            :last-child {
                border-right: 0;
            }
        }
    }
`

export const Informer = () => {
    const usersColumns = useMemo(
        () => [
            {
                Header: 'username',
                accessor: 'username',
            },
            {
                Header: 'email',
                accessor: 'email',
            },
        ],
        []
    )

    const projectsColumns = useMemo(
        () => [
            {
                Header: 'name',
                accessor: 'name',
            },
            {
                Header: 'description',
                accessor: 'description',
            },
        ],
        []
    )

    const { data: usersData, loading: usersLoading, error: usersError } = useQuery(USERS)
    const { data: projectsData, loading: projectsLoading, error: projectsError } = useQuery(PROJECTS)

    return (
        <div>
            <Styles>
                { usersLoading ?
                    <b>Loading users...</b> :
                    <Table columns={usersColumns} data={usersData.users}/>
                }
                { projectsLoading ?
                    <b>Loading projects...</b> :
                    <Table columns={projectsColumns} data={projectsData.projects}/>
                }
            </Styles>
        </div>
    )
}

const USERS = gql`
{
    users {
        username
        email
    }
}
`

const PROJECTS = gql`
{
    projects {
        name
        description
    }
}
`
