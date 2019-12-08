using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ZipPostalCodeLookupService.Services;
using ZipPostalCodeLookupService.Models;

namespace ZipPostalCodeLookupService.Controllers
{
    [Route("api/zipcode-lookup")]
    public class ZipLookupController : Controller
    {

        private readonly ZipLookupService _service;

        public ZipLookupController(ZipLookupService service)
        {
            _service = service;
        }

        [HttpPost]
        public async Task<ZipLookupRequestWrapper> GetZipcode([FromBody] ZipLookupRequestWrapper request)
        {
            var requestXml = request.RequestXml;
            var zipInfo = await _service.GetZipcodeInfo(requestXml);

            return new ZipLookupRequestWrapper()
            {
                RequestXml = zipInfo
            };
        }
    }
}
