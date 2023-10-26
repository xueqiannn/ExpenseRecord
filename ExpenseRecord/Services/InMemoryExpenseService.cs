using ExpenseRecord.Models;

namespace ExpenseRecord.Services
{
    public class InMemoryExpenseService
    {
        private static readonly List<ExpenseRecordDto> _expenseRecordDtos = new()
        {
            new ExpenseRecordDto {
                Id = "1",
                Description = "lunch",
                Type = "meal",
                Amount = 20.34,
                Date = DateTime.Now,
            },
            new ExpenseRecordDto {
                Id = "2",
                Description = "cup",
                Type = "shop",
                Amount = 40.00,
                Date = DateTime.Now,
            }
        };

        public ExpenseRecordDto Create(ExpenseRecordDto expenseRecordDto)
        {
            _expenseRecordDtos.Insert(0,expenseRecordDto);
            return expenseRecordDto;
        }

        public List<ExpenseRecordDto> Get()
        {
            return _expenseRecordDtos;

        }

        public bool Remove(string id)
        {
            var recordToBeRemoved = _expenseRecordDtos.Find(x => x.Id == id);
            if (recordToBeRemoved is null)
            {
                return false;
            }
            _expenseRecordDtos.Remove(recordToBeRemoved);
            return true;
        }
    }
}
