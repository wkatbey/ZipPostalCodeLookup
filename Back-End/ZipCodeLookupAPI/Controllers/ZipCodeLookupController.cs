using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ZipCodeLookup.Services;
using ZipCodeLookup.Models;

namespace ZipCodeLookup.Controllers
{
    [Route("api/zipcode-lookup")]
    public class ZipCodeLookupController : Controller
    {

        private readonly ZipCodeLookupService _service;

        public ZipCodeLookupController(ZipCodeLookupService service)
        {
            _service = service;
        }

        [HttpPost]
        public async Task<ZipCodeLookupRequestWrapper> GetZipcode([FromBody] ZipCodeLookupRequestWrapper request)
        {
            var requestXml = request.RequestXml;
            var zipInfo = await _service.GetZipcodeInfo(requestXml);

            return new ZipCodeLookupRequestWrapper()
            {
                RequestXml = zipInfo
            };
        }
    }
}
