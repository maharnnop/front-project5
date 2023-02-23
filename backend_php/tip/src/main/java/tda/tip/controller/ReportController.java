package tda.tip.controller;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;

import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import tda.tip.Repository.PolicyRepository;
import tda.tip.entity.TipPolicy;

@Controller
public class ReportController {
	@Autowired
    private PolicyRepository policyRepository;
	
    @GetMapping("/load-pdf")
    public ResponseEntity<byte[]> downloadInvoice() throws JRException, IOException {
		Optional<TipPolicy> opt = policyRepository.findById(9);
        ObjectMapper mapObject = new ObjectMapper();
		Map < String, Object > mapObj = mapObject.convertValue(opt.get(), Map.class);
		JRBeanCollectionDataSource beanCollectionDataSource = new JRBeanCollectionDataSource(Arrays.asList(
			mapObj), false);
		

		Map<String, Object> parameters = new HashMap<>();
		parameters.put("firstName", "maha");
		parameters.put("lastName", "sri");

		JasperReport compileReport = JasperCompileManager
				.compileReport(new FileInputStream("src/main/resources/policy-agent.jrxml"));

		JasperPrint jasperPrint = JasperFillManager.fillReport(compileReport, null,beanCollectionDataSource);
		JasperExportManager.exportReportToPdfFile(jasperPrint,"policy.pdf");
		// JasperExportManager.exportReportToPdfFile(jasperPrint,System.currentTimeMillis() + ".pdf");

		byte data[] = JasperExportManager.exportReportToPdf(jasperPrint);

		System.err.println(data);

		HttpHeaders headers = new HttpHeaders();
		headers.add("Content-Disposition", "inline; filename=citiesreport.pdf");

		return ResponseEntity.ok().headers(headers).contentType(MediaType.APPLICATION_PDF).body(data);
		
	}

}
