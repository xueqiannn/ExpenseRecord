using ExpenseRecord.Models;
using ExpenseRecord.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.FileSystemGlobbing;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ExpenseRecord.Controllers
{
    [Route("api/v1/expense")]
    [ApiController]
    public class ExpenseController : ControllerBase
    {
        private InMemoryExpenseService _inMemoryExpenseService;

        public ExpenseController(InMemoryExpenseService inMemoryExpenseService)
        {
            _inMemoryExpenseService = inMemoryExpenseService;
        }


        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        [ProducesResponseType(200)]
        [HttpGet]
        public ActionResult<IEnumerable<ExpenseRecordDto>> Get()
        {
            var res = _inMemoryExpenseService.Get();
            return Ok(res);
        }


        [ProducesResponseType(typeof(ExpenseRecordDto), 200)]
        [ProducesResponseType(typeof(ExpenseRecordDto), 201)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        [HttpPost]
        public ActionResult Post([FromBody] ExpenseRecordDto expenseRecordDto)
        {
            var res =_inMemoryExpenseService.Create(expenseRecordDto);
            return Created("", res);
        }



        [HttpDelete("{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        [ProducesResponseType(400)]
        public ActionResult Delete(string id)
        {
            var b = _inMemoryExpenseService.Remove(id);
            if (b)
            {
                return NoContent();
            }
            else
            {
                return NotFound($"Cannot find Document {id}");
            }
        }
    }
}
