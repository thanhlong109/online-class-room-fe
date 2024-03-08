import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './appHook';
import {
    accountAllFailure,
    accountAllStart,
    accountAllSuccess,
} from '../slices/getAllAccountSlice';
import { PagingParam } from '../types/TableParam';
import { useGetAllAccountsQuery } from '../services/account.services';

export function useAccountAll(input: PagingParam) {
    const state = useAppSelector((state) => state.accountAll);
    const dispatch = useAppDispatch();

    const { data: response, error, isLoading } = useGetAllAccountsQuery(input);

    useEffect(() => {
        if (isLoading) {
            dispatch(accountAllStart());
        } else if (error) {
            console.log('Error fetching accounts: ', error);
            dispatch(accountAllFailure());
        } else if (response) {
            dispatch(accountAllSuccess(response));
        }
    }, [dispatch, isLoading, error, response]);

    return { state, isLoading, response };
}
