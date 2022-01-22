// https://github.com/WebDevSimplified/react-budget-app

import { useState } from 'react';
import { Button, Container, Stack } from 'react-bootstrap';
import AddBudgetModal from './components/AddBudgetModal';
import AddExpenseModal from './components/AddExpenseModal';
import BudgetCard from './components/BudgetCard';
import TotalBudgetCard from './components/TotalBudgetCard';
import UncategorizedBudgetCard from './components/UncategorizedBudgetCard';
import ViewExpensesModal from './components/ViewExpensesModal';

import { UNCATEGORIZED_BUDGET_ID, useBudgets } from './contexts/BudgetContext';

function App() {
    const { budgets, getBudgetExpenses } = useBudgets();
    const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
    const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
    const [addExpenseModalId, setAddExpenseModalId] = useState();
    const [viewExpenseModalId, setViewExpenseModalId] = useState();

    const openAddExpenseModel = (budgetId) => {
        setShowAddExpenseModal(true);
        setAddExpenseModalId(budgetId);
    };

    return (
        <>
            <Container className='my-4'>
                <Stack direction='horizontal' gap='2' className='mb-4'>
                    <h1 className='me-auto'>Budgets</h1>
                    <Button variant='primary' onClick={() => setShowAddBudgetModal(true)}>
                        Add Budget
                    </Button>
                    <Button variant='outline-primary' onClick={openAddExpenseModel}>
                        Add Expense
                    </Button>
                </Stack>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem', alignItems: 'flex-start' }}>
                    {budgets.map((budget) => {
                        const amount = getBudgetExpenses(budget.id).reduce((total, expense) => total + expense.amount, 0);
                        return (
                            <BudgetCard
                                name={budget.name}
                                key={budget.id}
                                amount={amount}
                                max={budget.max}
                                onAddExpenseClick={() => openAddExpenseModel(budget.id)}
                                onViewExpennsesClick={() => setViewExpenseModalId(budget.id)}
                            />
                        );
                    })}
                    <UncategorizedBudgetCard
                        onAddExpenseClick={() => openAddExpenseModel(UNCATEGORIZED_BUDGET_ID)}
                        onViewExpennsesClick={() => setViewExpenseModalId(UNCATEGORIZED_BUDGET_ID)}
                    />
                    <TotalBudgetCard />
                </div>
            </Container>
            <AddBudgetModal show={showAddBudgetModal} handleClose={() => setShowAddBudgetModal(false)} />
            <AddExpenseModal show={showAddExpenseModal} defaultBudgetId={addExpenseModalId} handleClose={() => setShowAddExpenseModal(false)} />
            <ViewExpensesModal budgetId={viewExpenseModalId} handleClose={() => setViewExpenseModalId()} />
        </>
    );
}

export default App;
