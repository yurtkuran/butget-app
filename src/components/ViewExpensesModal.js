import { Button, Modal, Stack } from 'react-bootstrap';
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from '../contexts/BudgetContext';
import { currentFormatter } from '../utils';

const ViewExpensesModal = ({ budgetId, handleClose }) => {
    const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } = useBudgets();

    const expenses = getBudgetExpenses(budgetId);

    const budget =
        UNCATEGORIZED_BUDGET_ID === budgetId
            ? { name: 'Uncategorized', id: UNCATEGORIZED_BUDGET_ID }
            : budgets.find((budget) => budget.id === budgetId);

    return (
        <Modal show={budgetId != null} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <Stack direction='horizontal' gap='2'>
                        <div>Expenses - {budget?.name}</div>
                        {budgetId !== UNCATEGORIZED_BUDGET_ID && (
                            <Button
                                variant='outline-danger'
                                onClick={() => {
                                    deleteBudget(budget);
                                    handleClose();
                                }}
                            >
                                Delete
                            </Button>
                        )}
                    </Stack>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Stack direction='verticle' gap='3'>
                    {expenses.map((expense) => (
                        <Stack key={expense.id} direction='horizontal' gap='2'>
                            <div className='me-auto fs-4'>{expense.description}</div>
                            <div className='fs-5'>{currentFormatter.format(expense.amount)}</div>
                            <Button size='sm' variant='outline-danger' onClick={() => deleteExpense(expense)}>
                                &times;
                            </Button>
                        </Stack>
                    ))}
                </Stack>
            </Modal.Body>
        </Modal>
    );
};

export default ViewExpensesModal;