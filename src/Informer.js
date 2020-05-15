import React, { useState, useEffect, useMemo } from 'react'
import styled from 'styled-components'
import { GridTable } from './GridTable'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const Styles = styled.div`
    padding: 1rem;
    
    .boxed {
        display: inline-block;
        border: 5px solid green;
        border-radius: 10px;
        background: #D3D3D3;
    }

    .container {
        text-align: center;
        vertical-align: center;
    }

    .clearfix {
        overflow: auto;
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
                    <GridTable columns={usersColumns} data={usersData.users}/>
                }
                <p/>
                { projectsLoading ?
                    <b>Loading projects...</b> :
                    <GridTable columns={projectsColumns} data={projectsData.projects}/>
                }
            </Styles>
        </div>
    )
}

const USERS = gql`
{
    users {
        username
    }
}
`

const PROJECTS = gql`
{
    projects {
        name
    }
}
`
