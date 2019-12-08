using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace ZipPostalCodeLookupService.Services
{
    public class ZipLookupService : IZipLookupService
    {
        private readonly IHttpClientFactory _clientFactory;
        private readonly string _baseUrl = "https://secure.shippingapis.com/ShippingAPI.dll?API=ZipCodeLookup&XML=";

        public ZipLookupService(IHttpClientFactory clientFactory)
        {
            _clientFactory = clientFactory;
        }

        public async Task<string> GetZipcodeInfo(string requestString)
        {
            var fullUrl = _baseUrl + requestString;

            Console.WriteLine("Request String " + fullUrl);

            var request = new HttpRequestMessage(HttpMethod.Post, fullUrl);

            var client = _clientFactory.CreateClient();

            var response = await client.SendAsync(request);

            return await response.Content.ReadAsStringAsync();
        }
    }

    public interface IZipLookupService
    {

    }
}
