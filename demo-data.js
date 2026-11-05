window.DEMO_DATA = {
 "hardware": {
  "os": "Windows",
  "os_version": "11",
  "arch": "AMD64",
  "cpu_model": "Intel Core i7 (demo laptop)",
  "cpu_cores_physical": 8,
  "cpu_cores_logical": 16,
  "total_ram_gb": 16.0,
  "available_ram_gb": 9.4,
  "free_disk_gb": 120.0,
  "gpu": "Integrated graphics (demo)",
  "python": "3.12",
  "running_as_admin": false,
  "installation_mode": "manual",
  "disk_budget_gib": 10.0
 },
 "status": {
  "runtime": {
   "name": "Ollama",
   "installed": true,
   "running": true,
   "models": [],
   "lab_models": []
  },
  "installation_mode": "manual",
  "auto_setup": "optional, requires confirmation",
  "assistant": {
   "ready": false,
   "model": null,
   "wanted_model": "qwen2.5:3b",
   "guardrails_required": true,
   "comparison_mode": "Use the isolated text-only evaluation harness."
  },
  "platform_validation": "Windows implementation has automated tests, but no physical Windows validation is claimed.",
  "goals": {
   "try": {
    "label": "Try a small model",
    "detail": "Start with a smaller candidate."
   },
   "study": {
    "label": "Explore concepts",
    "detail": "Explain and test local inference."
   },
   "write": {
    "label": "Explore writing",
    "detail": "Compare sample outputs."
   },
   "code": {
    "label": "Explore coding",
    "detail": "Inspect and verify sample explanations."
   }
  }
 },
 "recommend": {
  "try": {
   "planning_ram_gb": 9.4,
   "free_ram_now_gb": 9.4,
   "disk_cap_gb": 6.902,
   "project_headroom_gib": 6.902,
   "free_disk_after_reserve_gib": 118.0,
   "budget": {
    "budget_gib": 10.0,
    "non_model_gib": 3.097628,
    "installed_models_gib": 0.0,
    "total_installed_gib": 6.495954,
    "verified": true,
    "basis": "Measured logical bytes of lab, project Python environment and discovered runtime; excludes a pre-existing base Python distribution, model inventory and result files.",
    "model_inventory_basis": "Conventional/configured model folders only; runtime inventory unavailable.",
    "missing": [
     "runtime model inventory"
    ],
    "disk_units": "GiB (2^30 bytes)"
   },
   "hypothetical": false,
   "budget_verified": true,
   "catalog_estimates_verified": false,
   "recommended": {
    "name": "phi3.5",
    "params_billion": 3.8,
    "download_file_size_gb": 2.4,
    "needs_free_ram_gb": 5.5,
    "requires_license_acceptance": false,
    "hf_repo": "bartowski/Phi-3.5-mini-instruct-GGUF",
    "hf_file": "Phi-3.5-mini-instruct-Q4_K_M.gguf",
    "good_for": "Candidate use cases require local evaluation.",
    "quantization": null,
    "quantization_source": "Unknown until runtime metadata is observed; catalog GGUF quantization does not prove Ollama quantization.",
    "catalog_file_quantization": "Q4_K_M",
    "catalog_estimates_verified": false
   },
   "faster_option": {
    "name": "llama3.2:3b",
    "params_billion": 3.2,
    "download_file_size_gb": 2.0,
    "needs_free_ram_gb": 5.0,
    "requires_license_acceptance": true,
    "hf_repo": "bartowski/Llama-3.2-3B-Instruct-GGUF",
    "hf_file": "Llama-3.2-3B-Instruct-Q4_K_M.gguf",
    "good_for": "Candidate use cases require local evaluation.",
    "quantization": null,
    "quantization_source": "Unknown until runtime metadata is observed; catalog GGUF quantization does not prove Ollama quantization.",
    "catalog_file_quantization": "Q4_K_M",
    "catalog_estimates_verified": false
   },
   "stronger_option": {
    "name": "mistral:7b",
    "params_billion": 7.2,
    "download_file_size_gb": 4.4,
    "needs_free_ram_gb": 8.0,
    "requires_license_acceptance": false,
    "hf_repo": "bartowski/Mistral-7B-Instruct-v0.3-GGUF",
    "hf_file": "Mistral-7B-Instruct-v0.3-Q4_K_M.gguf",
    "good_for": "Candidate use cases require local evaluation.",
    "quantization": null,
    "quantization_source": "Unknown until runtime metadata is observed; catalog GGUF quantization does not prove Ollama quantization.",
    "catalog_file_quantization": "Q4_K_M",
    "catalog_estimates_verified": false
   },
   "explanation": "phi3.5 is a planning candidate based on provisional catalog RAM/file estimates. The project cap covers lab/Python/runtime and one selected model; unrelated existing models are reported but excluded. Project footprint checks are available; execution will recheck current resources. Smaller/larger alternatives describe parameter counts, not proven speed or answer quality.",
   "past_benchmarks_on_this_machine": {},
   "goal": "try",
   "goal_why": "A smaller parameter count is a planning choice; measure actual speed and output quality.",
   "pick": {
    "name": "llama3.2:3b",
    "params_billion": 3.2,
    "download_file_size_gb": 2.0,
    "needs_free_ram_gb": 5.0,
    "requires_license_acceptance": true,
    "hf_repo": "bartowski/Llama-3.2-3B-Instruct-GGUF",
    "hf_file": "Llama-3.2-3B-Instruct-Q4_K_M.gguf",
    "good_for": "Candidate use cases require local evaluation.",
    "quantization": null,
    "quantization_source": "Unknown until runtime metadata is observed; catalog GGUF quantization does not prove Ollama quantization.",
    "catalog_file_quantization": "Q4_K_M",
    "catalog_estimates_verified": false
   },
   "options": [
    {
     "name": "llama3.2:3b",
     "params_billion": 3.2,
     "download_file_size_gb": 2.0,
     "needs_free_ram_gb": 5.0,
     "requires_license_acceptance": true,
     "hf_repo": "bartowski/Llama-3.2-3B-Instruct-GGUF",
     "hf_file": "Llama-3.2-3B-Instruct-Q4_K_M.gguf",
     "good_for": "Candidate use cases require local evaluation.",
     "quantization": null,
     "quantization_source": "Unknown until runtime metadata is observed; catalog GGUF quantization does not prove Ollama quantization.",
     "catalog_file_quantization": "Q4_K_M",
     "catalog_estimates_verified": false
    },
    {
     "name": "phi3.5",
     "params_billion": 3.8,
     "download_file_size_gb": 2.4,
     "needs_free_ram_gb": 5.5,
     "requires_license_acceptance": false,
     "hf_repo": "bartowski/Phi-3.5-mini-instruct-GGUF",
     "hf_file": "Phi-3.5-mini-instruct-Q4_K_M.gguf",
     "good_for": "Candidate use cases require local evaluation.",
     "quantization": null,
     "quantization_source": "Unknown until runtime metadata is observed; catalog GGUF quantization does not prove Ollama quantization.",
     "catalog_file_quantization": "Q4_K_M",
     "catalog_estimates_verified": false
    },
    {
     "name": "mistral:7b",
     "params_billion": 7.2,
     "download_file_size_gb": 4.4,
     "needs_free_ram_gb": 8.0,
     "requires_license_acceptance": false,
     "hf_repo": "bartowski/Mistral-7B-Instruct-v0.3-GGUF",
     "hf_file": "Mistral-7B-Instruct-v0.3-Q4_K_M.gguf",
     "good_for": "Candidate use cases require local evaluation.",
     "quantization": null,
     "quantization_source": "Unknown until runtime metadata is observed; catalog GGUF quantization does not prove Ollama quantization.",
     "catalog_file_quantization": "Q4_K_M",
     "catalog_estimates_verified": false
    }
   ]
  },
  "study": {
   "planning_ram_gb": 9.4,
   "free_ram_now_gb": 9.4,
   "disk_cap_gb": 6.902,
   "project_headroom_gib": 6.902,
   "free_disk_after_reserve_gib": 118.0,
   "budget": {
    "budget_gib": 10.0,
    "non_model_gib": 3.097628,
    "installed_models_gib": 0.0,
    "total_installed_gib": 6.495954,
    "verified": true,
    "basis": "Measured logical bytes of lab, project Python environment and discovered runtime; excludes a pre-existing base Python distribution, model inventory and result files.",
    "model_inventory_basis": "Conventional/configured model folders only; runtime inventory unavailable.",
    "missing": [
     "runtime model inventory"
    ],
    "disk_units": "GiB (2^30 bytes)"
   },
   "hypothetical": false,
   "budget_verified": true,
   "catalog_estimates_verified": false,
   "recommended": {
    "name": "phi3.5",
    "params_billion": 3.8,
    "download_file_size_gb": 2.4,
    "needs_free_ram_gb": 5.5,
    "requires_license_acceptance": false,
    "hf_repo": "bartowski/Phi-3.5-mini-instruct-GGUF",
    "hf_file": "Phi-3.5-mini-instruct-Q4_K_M.gguf",
    "good_for": "Candidate use cases require local evaluation.",
    "quantization": null,
    "quantization_source": "Unknown until runtime metadata is observed; catalog GGUF quantization does not prove Ollama quantization.",
    "catalog_file_quantization": "Q4_K_M",
    "catalog_estimates_verified": false
   },
   "faster_option": {
    "name": "llama3.2:3b",
    "params_billion": 3.2,
    "download_file_size_gb": 2.0,
    "needs_free_ram_gb": 5.0,
    "requires_license_acceptance": true,
    "hf_repo": "bartowski/Llama-3.2-3B-Instruct-GGUF",
    "hf_file": "Llama-3.2-3B-Instruct-Q4_K_M.gguf",
    "good_for": "Candidate use cases require local evaluation.",
    "quantization": null,
    "quantization_source": "Unknown until runtime metadata is observed; catalog GGUF quantization does not prove Ollama quantization.",
    "catalog_file_quantization": "Q4_K_M",
    "catalog_estimates_verified": false
   },
   "stronger_option": {
    "name": "mistral:7b",
    "params_billion": 7.2,
    "download_file_size_gb": 4.4,
    "needs_free_ram_gb": 8.0,
    "requires_license_acceptance": false,
    "hf_repo": "bartowski/Mistral-7B-Instruct-v0.3-GGUF",
    "hf_file": "Mistral-7B-Instruct-v0.3-Q4_K_M.gguf",
    "good_for": "Candidate use cases require local evaluation.",
    "quantization": null,
    "quantization_source": "Unknown until runtime metadata is observed; catalog GGUF quantization does not prove Ollama quantization.",
    "catalog_file_quantization": "Q4_K_M",
    "catalog_estimates_verified": false
   },
   "explanation": "phi3.5 is a planning candidate based on provisional catalog RAM/file estimates. The project cap covers lab/Python/runtime and one selected model; unrelated existing models are reported but excluded. Project footprint checks are available; execution will recheck current resources. Smaller/larger alternatives describe parameter counts, not proven speed or answer quality.",
   "past_benchmarks_on_this_machine": {},
   "goal": "study",
   "goal_why": "Choose using current resources, then evaluate the model's answers critically.",
   "pick": {
    "name": "phi3.5",
    "params_billion": 3.8,
    "download_file_size_gb": 2.4,
    "needs_free_ram_gb": 5.5,
    "requires_license_acceptance": false,
    "hf_repo": "bartowski/Phi-3.5-mini-instruct-GGUF",
    "hf_file": "Phi-3.5-mini-instruct-Q4_K_M.gguf",
    "good_for": "Candidate use cases require local evaluation.",
    "quantization": null,
    "quantization_source": "Unknown until runtime metadata is observed; catalog GGUF quantization does not prove Ollama quantization.",
    "catalog_file_quantization": "Q4_K_M",
    "catalog_estimates_verified": false
   },
   "options": [
    {
     "name": "llama3.2:3b",
     "params_billion": 3.2,
     "download_file_size_gb": 2.0,
     "needs_free_ram_gb": 5.0,
     "requires_license_acceptance": true,
     "hf_repo": "bartowski/Llama-3.2-3B-Instruct-GGUF",
     "hf_file": "Llama-3.2-3B-Instruct-Q4_K_M.gguf",
     "good_for": "Candidate use cases require local evaluation.",
     "quantization": null,
     "quantization_source": "Unknown until runtime metadata is observed; catalog GGUF quantization does not prove Ollama quantization.",
     "catalog_file_quantization": "Q4_K_M",
     "catalog_estimates_verified": false
    },
    {
     "name": "phi3.5",
     "params_billion": 3.8,
     "download_file_size_gb": 2.4,
     "needs_free_ram_gb": 5.5,
     "requires_license_acceptance": false,
     "hf_repo": "bartowski/Phi-3.5-mini-instruct-GGUF",
     "hf_file": "Phi-3.5-mini-instruct-Q4_K_M.gguf",
     "good_for": "Candidate use cases require local evaluation.",
     "quantization": null,
     "quantization_source": "Unknown until runtime metadata is observed; catalog GGUF quantization does not prove Ollama quantization.",
     "catalog_file_quantization": "Q4_K_M",
     "catalog_estimates_verified": false
    },
    {
     "name": "mistral:7b",
     "params_billion": 7.2,
     "download_file_size_gb": 4.4,
     "needs_free_ram_gb": 8.0,
     "requires_license_acceptance": false,
     "hf_repo": "bartowski/Mistral-7B-Instruct-v0.3-GGUF",
     "hf_file": "Mistral-7B-Instruct-v0.3-Q4_K_M.gguf",
     "good_for": "Candidate use cases require local evaluation.",
     "quantization": null,
     "quantization_source": "Unknown until runtime metadata is observed; catalog GGUF quantization does not prove Ollama quantization.",
     "catalog_file_quantization": "Q4_K_M",
     "catalog_estimates_verified": false
    }
   ]
  },
  "write": {
   "planning_ram_gb": 9.4,
   "free_ram_now_gb": 9.4,
   "disk_cap_gb": 6.902,
   "project_headroom_gib": 6.902,
   "free_disk_after_reserve_gib": 118.0,
   "budget": {
    "budget_gib": 10.0,
    "non_model_gib": 3.097628,
    "installed_models_gib": 0.0,
    "total_installed_gib": 6.495954,
    "verified": true,
    "basis": "Measured logical bytes of lab, project Python environment and discovered runtime; excludes a pre-existing base Python distribution, model inventory and result files.",
    "model_inventory_basis": "Conventional/configured model folders only; runtime inventory unavailable.",
    "missing": [
     "runtime model inventory"
    ],
    "disk_units": "GiB (2^30 bytes)"
   },
   "hypothetical": false,
   "budget_verified": true,
   "catalog_estimates_verified": false,
   "recommended": {
    "name": "phi3.5",
    "params_billion": 3.8,
    "download_file_size_gb": 2.4,
    "needs_free_ram_gb": 5.5,
    "requires_license_acceptance": false,
    "hf_repo": "bartowski/Phi-3.5-mini-instruct-GGUF",
    "hf_file": "Phi-3.5-mini-instruct-Q4_K_M.gguf",
    "good_for": "Candidate use cases require local evaluation.",
    "quantization": null,
    "quantization_source": "Unknown until runtime metadata is observed; catalog GGUF quantization does not prove Ollama quantization.",
    "catalog_file_quantization": "Q4_K_M",
    "catalog_estimates_verified": false
   },
   "faster_option": {
    "name": "llama3.2:3b",
    "params_billion": 3.2,
    "download_file_size_gb": 2.0,
    "needs_free_ram_gb": 5.0,
    "requires_license_acceptance": true,
    "hf_repo": "bartowski/Llama-3.2-3B-Instruct-GGUF",
    "hf_file": "Llama-3.2-3B-Instruct-Q4_K_M.gguf",
    "good_for": "Candidate use cases require local evaluation.",
    "quantization": null,
    "quantization_source": "Unknown until runtime metadata is observed; catalog GGUF quantization does not prove Ollama quantization.",
    "catalog_file_quantization": "Q4_K_M",
    "catalog_estimates_verified": false
   },
   "stronger_option": {
    "name": "mistral:7b",
    "params_billion": 7.2,
    "download_file_size_gb": 4.4,
    "needs_free_ram_gb": 8.0,
    "requires_license_acceptance": false,
    "hf_repo": "bartowski/Mistral-7B-Instruct-v0.3-GGUF",
    "hf_file": "Mistral-7B-Instruct-v0.3-Q4_K_M.gguf",
    "good_for": "Candidate use cases require local evaluation.",
    "quantization": null,
    "quantization_source": "Unknown until runtime metadata is observed; catalog GGUF quantization does not prove Ollama quantization.",
    "catalog_file_quantization": "Q4_K_M",
    "catalog_estimates_verified": false
   },
   "explanation": "phi3.5 is a planning candidate based on provisional catalog RAM/file estimates. The project cap covers lab/Python/runtime and one selected model; unrelated existing models are reported but excluded. Project footprint checks are available; execution will recheck current resources. Smaller/larger alternatives describe parameter counts, not proven speed or answer quality.",
   "past_benchmarks_on_this_machine": {},
   "goal": "write",
   "goal_why": "These are resource-based candidates, not verified writing-quality rankings.",
   "pick": {
    "name": "phi3.5",
    "params_billion": 3.8,
    "download_file_size_gb": 2.4,
    "needs_free_ram_gb": 5.5,
    "requires_license_acceptance": false,
    "hf_repo": "bartowski/Phi-3.5-mini-instruct-GGUF",
    "hf_file": "Phi-3.5-mini-instruct-Q4_K_M.gguf",
    "good_for": "Candidate use cases require local evaluation.",
    "quantization": null,
    "quantization_source": "Unknown until runtime metadata is observed; catalog GGUF quantization does not prove Ollama quantization.",
    "catalog_file_quantization": "Q4_K_M",
    "catalog_estimates_verified": false
   },
   "options": [
    {
     "name": "llama3.2:3b",
     "params_billion": 3.2,
     "download_file_size_gb": 2.0,
     "needs_free_ram_gb": 5.0,
     "requires_license_acceptance": true,
     "hf_repo": "bartowski/Llama-3.2-3B-Instruct-GGUF",
     "hf_file": "Llama-3.2-3B-Instruct-Q4_K_M.gguf",
     "good_for": "Candidate use cases require local evaluation.",
     "quantization": null,
     "quantization_source": "Unknown until runtime metadata is observed; catalog GGUF quantization does not prove Ollama quantization.",
     "catalog_file_quantization": "Q4_K_M",
     "catalog_estimates_verified": false
    },
    {
     "name": "phi3.5",
     "params_billion": 3.8,
     "download_file_size_gb": 2.4,
     "needs_free_ram_gb": 5.5,
     "requires_license_acceptance": false,
     "hf_repo": "bartowski/Phi-3.5-mini-instruct-GGUF",
     "hf_file": "Phi-3.5-mini-instruct-Q4_K_M.gguf",
     "good_for": "Candidate use cases require local evaluation.",
     "quantization": null,
     "quantization_source": "Unknown until runtime metadata is observed; catalog GGUF quantization does not prove Ollama quantization.",
     "catalog_file_quantization": "Q4_K_M",
     "catalog_estimates_verified": false
    },
    {
     "name": "mistral:7b",
     "params_billion": 7.2,
     "download_file_size_gb": 4.4,
     "needs_free_ram_gb": 8.0,
     "requires_license_acceptance": false,
     "hf_repo": "bartowski/Mistral-7B-Instruct-v0.3-GGUF",
     "hf_file": "Mistral-7B-Instruct-v0.3-Q4_K_M.gguf",
     "good_for": "Candidate use cases require local evaluation.",
     "quantization": null,
     "quantization_source": "Unknown until runtime metadata is observed; catalog GGUF quantization does not prove Ollama quantization.",
     "catalog_file_quantization": "Q4_K_M",
     "catalog_estimates_verified": false
    }
   ]
  },
  "code": {
   "planning_ram_gb": 9.4,
   "free_ram_now_gb": 9.4,
   "disk_cap_gb": 6.902,
   "project_headroom_gib": 6.902,
   "free_disk_after_reserve_gib": 118.0,
   "budget": {
    "budget_gib": 10.0,
    "non_model_gib": 3.097628,
    "installed_models_gib": 0.0,
    "total_installed_gib": 6.495954,
    "verified": true,
    "basis": "Measured logical bytes of lab, project Python environment and discovered runtime; excludes a pre-existing base Python distribution, model inventory and result files.",
    "model_inventory_basis": "Conventional/configured model folders only; runtime inventory unavailable.",
    "missing": [
     "runtime model inventory"
    ],
    "disk_units": "GiB (2^30 bytes)"
   },
   "hypothetical": false,
   "budget_verified": true,
   "catalog_estimates_verified": false,
   "recommended": {
    "name": "phi3.5",
    "params_billion": 3.8,
    "download_file_size_gb": 2.4,
    "needs_free_ram_gb": 5.5,
    "requires_license_acceptance": false,
    "hf_repo": "bartowski/Phi-3.5-mini-instruct-GGUF",
    "hf_file": "Phi-3.5-mini-instruct-Q4_K_M.gguf",
    "good_for": "Candidate use cases require local evaluation.",
    "quantization": null,
    "quantization_source": "Unknown until runtime metadata is observed; catalog GGUF quantization does not prove Ollama quantization.",
    "catalog_file_quantization": "Q4_K_M",
    "catalog_estimates_verified": false
   },
   "faster_option": {
    "name": "llama3.2:3b",
    "params_billion": 3.2,
    "download_file_size_gb": 2.0,
    "needs_free_ram_gb": 5.0,
    "requires_license_acceptance": true,
    "hf_repo": "bartowski/Llama-3.2-3B-Instruct-GGUF",
    "hf_file": "Llama-3.2-3B-Instruct-Q4_K_M.gguf",
    "good_for": "Candidate use cases require local evaluation.",
    "quantization": null,
    "quantization_source": "Unknown until runtime metadata is observed; catalog GGUF quantization does not prove Ollama quantization.",
    "catalog_file_quantization": "Q4_K_M",
    "catalog_estimates_verified": false
   },
   "stronger_option": {
    "name": "mistral:7b",
    "params_billion": 7.2,
    "download_file_size_gb": 4.4,
    "needs_free_ram_gb": 8.0,
    "requires_license_acceptance": false,
    "hf_repo": "bartowski/Mistral-7B-Instruct-v0.3-GGUF",
    "hf_file": "Mistral-7B-Instruct-v0.3-Q4_K_M.gguf",
    "good_for": "Candidate use cases require local evaluation.",
    "quantization": null,
    "quantization_source": "Unknown until runtime metadata is observed; catalog GGUF quantization does not prove Ollama quantization.",
    "catalog_file_quantization": "Q4_K_M",
    "catalog_estimates_verified": false
   },
   "explanation": "phi3.5 is a planning candidate based on provisional catalog RAM/file estimates. The project cap covers lab/Python/runtime and one selected model; unrelated existing models are reported but excluded. Project footprint checks are available; execution will recheck current resources. Smaller/larger alternatives describe parameter counts, not proven speed or answer quality.",
   "past_benchmarks_on_this_machine": {},
   "goal": "code",
   "goal_why": "A larger candidate may fit; coding quality still requires evaluation.",
   "pick": {
    "name": "mistral:7b",
    "params_billion": 7.2,
    "download_file_size_gb": 4.4,
    "needs_free_ram_gb": 8.0,
    "requires_license_acceptance": false,
    "hf_repo": "bartowski/Mistral-7B-Instruct-v0.3-GGUF",
    "hf_file": "Mistral-7B-Instruct-v0.3-Q4_K_M.gguf",
    "good_for": "Candidate use cases require local evaluation.",
    "quantization": null,
    "quantization_source": "Unknown until runtime metadata is observed; catalog GGUF quantization does not prove Ollama quantization.",
    "catalog_file_quantization": "Q4_K_M",
    "catalog_estimates_verified": false
   },
   "options": [
    {
     "name": "llama3.2:3b",
     "params_billion": 3.2,
     "download_file_size_gb": 2.0,
     "needs_free_ram_gb": 5.0,
     "requires_license_acceptance": true,
     "hf_repo": "bartowski/Llama-3.2-3B-Instruct-GGUF",
     "hf_file": "Llama-3.2-3B-Instruct-Q4_K_M.gguf",
     "good_for": "Candidate use cases require local evaluation.",
     "quantization": null,
     "quantization_source": "Unknown until runtime metadata is observed; catalog GGUF quantization does not prove Ollama quantization.",
     "catalog_file_quantization": "Q4_K_M",
     "catalog_estimates_verified": false
    },
    {
     "name": "phi3.5",
     "params_billion": 3.8,
     "download_file_size_gb": 2.4,
     "needs_free_ram_gb": 5.5,
     "requires_license_acceptance": false,
     "hf_repo": "bartowski/Phi-3.5-mini-instruct-GGUF",
     "hf_file": "Phi-3.5-mini-instruct-Q4_K_M.gguf",
     "good_for": "Candidate use cases require local evaluation.",
     "quantization": null,
     "quantization_source": "Unknown until runtime metadata is observed; catalog GGUF quantization does not prove Ollama quantization.",
     "catalog_file_quantization": "Q4_K_M",
     "catalog_estimates_verified": false
    },
    {
     "name": "mistral:7b",
     "params_billion": 7.2,
     "download_file_size_gb": 4.4,
     "needs_free_ram_gb": 8.0,
     "requires_license_acceptance": false,
     "hf_repo": "bartowski/Mistral-7B-Instruct-v0.3-GGUF",
     "hf_file": "Mistral-7B-Instruct-v0.3-Q4_K_M.gguf",
     "good_for": "Candidate use cases require local evaluation.",
     "quantization": null,
     "quantization_source": "Unknown until runtime metadata is observed; catalog GGUF quantization does not prove Ollama quantization.",
     "catalog_file_quantization": "Q4_K_M",
     "catalog_estimates_verified": false
    }
   ]
  }
 },
 "auto_plan": {
  "try": {
   "goal": "try",
   "goal_label": "Try a small model",
   "confirm_code": "demo-try",
   "expires_in_s": 300,
   "manual_alternative": "Use the Deploy tab to do each step yourself.",
   "model": {
    "name": "llama3.2:3b",
    "params_billion": 3.2,
    "download_file_size_gb": 2.0,
    "needs_free_ram_gb": 5.0,
    "requires_license_acceptance": true,
    "hf_repo": "bartowski/Llama-3.2-3B-Instruct-GGUF",
    "hf_file": "Llama-3.2-3B-Instruct-Q4_K_M.gguf",
    "good_for": "Candidate use cases require local evaluation.",
    "quantization": null,
    "quantization_source": "Unknown until runtime metadata is observed; catalog GGUF quantization does not prove Ollama quantization.",
    "catalog_file_quantization": "Q4_K_M",
    "catalog_estimates_verified": false
   },
   "already_installed": false,
   "download_gib_estimate": 2.0,
   "free_disk_gib": 120.0,
   "available_ram_gib": 9.4,
   "license_note": "This model's publisher (Meta) license applies; review it before use.",
   "source": "Downloaded by your local Ollama from its model registry; Ollama verifies each file's digest.",
   "security_note": "Auto is less transparent than doing each step yourself: you approve one plan instead of each command. It never installs programs, runs shell commands, needs admin rights, or deletes files.",
   "goal_why": "A smaller parameter count is a planning choice; measure actual speed and output quality.",
   "steps": [
    "Ask your local Ollama to download llama3.2:3b (about 2.0 GiB) from Ollama's model registry.",
    "Verify the runtime, exact model tag, digest and the 10 GiB project budget.",
    "Run a short first prompt to confirm the model answers.",
    "Open a chat box for the model on this page."
   ]
  },
  "study": {
   "goal": "study",
   "goal_label": "Explore concepts",
   "confirm_code": "demo-study",
   "expires_in_s": 300,
   "manual_alternative": "Use the Deploy tab to do each step yourself.",
   "model": {
    "name": "phi3.5",
    "params_billion": 3.8,
    "download_file_size_gb": 2.4,
    "needs_free_ram_gb": 5.5,
    "requires_license_acceptance": false,
    "hf_repo": "bartowski/Phi-3.5-mini-instruct-GGUF",
    "hf_file": "Phi-3.5-mini-instruct-Q4_K_M.gguf",
    "good_for": "Candidate use cases require local evaluation.",
    "quantization": null,
    "quantization_source": "Unknown until runtime metadata is observed; catalog GGUF quantization does not prove Ollama quantization.",
    "catalog_file_quantization": "Q4_K_M",
    "catalog_estimates_verified": false
   },
   "already_installed": false,
   "download_gib_estimate": 2.4,
   "free_disk_gib": 120.0,
   "available_ram_gib": 9.4,
   "license_note": "Review the model's published license before use.",
   "source": "Downloaded by your local Ollama from its model registry; Ollama verifies each file's digest.",
   "security_note": "Auto is less transparent than doing each step yourself: you approve one plan instead of each command. It never installs programs, runs shell commands, needs admin rights, or deletes files.",
   "goal_why": "Choose using current resources, then evaluate the model's answers critically.",
   "steps": [
    "Ask your local Ollama to download phi3.5 (about 2.4 GiB) from Ollama's model registry.",
    "Verify the runtime, exact model tag, digest and the 10 GiB project budget.",
    "Run a short first prompt to confirm the model answers.",
    "Open a chat box for the model on this page."
   ]
  },
  "write": {
   "goal": "write",
   "goal_label": "Explore writing",
   "confirm_code": "demo-write",
   "expires_in_s": 300,
   "manual_alternative": "Use the Deploy tab to do each step yourself.",
   "model": {
    "name": "phi3.5",
    "params_billion": 3.8,
    "download_file_size_gb": 2.4,
    "needs_free_ram_gb": 5.5,
    "requires_license_acceptance": false,
    "hf_repo": "bartowski/Phi-3.5-mini-instruct-GGUF",
    "hf_file": "Phi-3.5-mini-instruct-Q4_K_M.gguf",
    "good_for": "Candidate use cases require local evaluation.",
    "quantization": null,
    "quantization_source": "Unknown until runtime metadata is observed; catalog GGUF quantization does not prove Ollama quantization.",
    "catalog_file_quantization": "Q4_K_M",
    "catalog_estimates_verified": false
   },
   "already_installed": false,
   "download_gib_estimate": 2.4,
   "free_disk_gib": 120.0,
   "available_ram_gib": 9.4,
   "license_note": "Review the model's published license before use.",
   "source": "Downloaded by your local Ollama from its model registry; Ollama verifies each file's digest.",
   "security_note": "Auto is less transparent than doing each step yourself: you approve one plan instead of each command. It never installs programs, runs shell commands, needs admin rights, or deletes files.",
   "goal_why": "These are resource-based candidates, not verified writing-quality rankings.",
   "steps": [
    "Ask your local Ollama to download phi3.5 (about 2.4 GiB) from Ollama's model registry.",
    "Verify the runtime, exact model tag, digest and the 10 GiB project budget.",
    "Run a short first prompt to confirm the model answers.",
    "Open a chat box for the model on this page."
   ]
  },
  "code": {
   "goal": "code",
   "goal_label": "Explore coding",
   "confirm_code": "demo-code",
   "expires_in_s": 300,
   "manual_alternative": "Use the Deploy tab to do each step yourself.",
   "model": {
    "name": "mistral:7b",
    "params_billion": 7.2,
    "download_file_size_gb": 4.4,
    "needs_free_ram_gb": 8.0,
    "requires_license_acceptance": false,
    "hf_repo": "bartowski/Mistral-7B-Instruct-v0.3-GGUF",
    "hf_file": "Mistral-7B-Instruct-v0.3-Q4_K_M.gguf",
    "good_for": "Candidate use cases require local evaluation.",
    "quantization": null,
    "quantization_source": "Unknown until runtime metadata is observed; catalog GGUF quantization does not prove Ollama quantization.",
    "catalog_file_quantization": "Q4_K_M",
    "catalog_estimates_verified": false
   },
   "already_installed": false,
   "download_gib_estimate": 4.4,
   "free_disk_gib": 120.0,
   "available_ram_gib": 9.4,
   "license_note": "Review the model's published license before use.",
   "source": "Downloaded by your local Ollama from its model registry; Ollama verifies each file's digest.",
   "security_note": "Auto is less transparent than doing each step yourself: you approve one plan instead of each command. It never installs programs, runs shell commands, needs admin rights, or deletes files.",
   "goal_why": "A larger candidate may fit; coding quality still requires evaluation.",
   "steps": [
    "Ask your local Ollama to download mistral:7b (about 4.4 GiB) from Ollama's model registry.",
    "Verify the runtime, exact model tag, digest and the 10 GiB project budget.",
    "Run a short first prompt to confirm the model answers.",
    "Open a chat box for the model on this page."
   ]
  }
 },
 "plan": {
  "llama3.2:3b": {
   "model": {
    "name": "llama3.2:3b",
    "params_billion": 3.2,
    "download_file_size_gb": 2.0,
    "needs_free_ram_gb": 5.0,
    "requires_license_acceptance": true,
    "hf_repo": "bartowski/Llama-3.2-3B-Instruct-GGUF",
    "hf_file": "Llama-3.2-3B-Instruct-Q4_K_M.gguf",
    "good_for": "Candidate use cases require local evaluation.",
    "quantization": null,
    "quantization_source": "Unknown until runtime metadata is observed; catalog GGUF quantization does not prove Ollama quantization.",
    "catalog_file_quantization": "Q4_K_M",
    "catalog_estimates_verified": false
   },
   "installation_mode": "manual",
   "steps": [
    {
     "id": "install_runtime",
     "action": null,
     "kind": "manual",
     "title": "Manually install the runtime",
     "done": true,
     "why": "Model weights need a runtime that loads them and performs inference.",
     "does": "Review the official installer for your OS. Use a standard-user installation only. If the installer asks for admin access, or the OS blocks it, stop and ask the team for a supported route. Do not disable Gatekeeper, antivirus, execution policy, or other security protections.",
     "command": null,
     "args": {},
     "link": "https://ollama.com/download"
    },
    {
     "id": "start_runtime",
     "action": null,
     "kind": "manual",
     "title": "Manually start your runtime",
     "done": true,
     "why": "The lab talks to a model server on this laptop only.",
     "does": "Open/start it yourself. This helper does not launch programs or change system settings.",
     "command": "Open the Ollama application from your user account.",
     "args": {},
     "link": null
    },
    {
     "id": "pull_model",
     "action": null,
     "kind": "manual",
     "title": "Manually download llama3.2:3b",
     "done": false,
     "why": "Download the exact catalog tag, then verify the result.",
     "does": "The catalog estimates about 2.0 GiB; the actual artifact and quantization must be checked. The 10 GiB project cap counts this selected model plus the lab, Python and runtime. Pre-existing unrelated models are reported separately.",
     "command": "ollama pull llama3.2:3b",
     "args": {},
     "link": null
    },
    {
     "id": "verify_install",
     "action": "check_install",
     "kind": "action",
     "title": "Verify the manual steps",
     "done": false,
     "why": "Check observable prerequisites without hiding the installation process.",
     "does": "Read runtime/model state, provenance and the selected project's disk budget. This does not install or download anything.",
     "command": null,
     "args": {
      "up_to_step": 4
     },
     "link": null
    },
    {
     "id": "first_prompt",
     "action": "first_prompt",
     "kind": "action",
     "title": "Run a bounded first prompt",
     "done": false,
     "why": "A real response verifies that the prepared model can perform inference.",
     "does": "After resource checks, ask the selected model for a short greeting. Timing depends on this device.",
     "command": null,
     "args": {
      "model": "llama3.2:3b"
     },
     "link": null
    }
   ]
  },
  "phi3.5": {
   "model": {
    "name": "phi3.5",
    "params_billion": 3.8,
    "download_file_size_gb": 2.4,
    "needs_free_ram_gb": 5.5,
    "requires_license_acceptance": false,
    "hf_repo": "bartowski/Phi-3.5-mini-instruct-GGUF",
    "hf_file": "Phi-3.5-mini-instruct-Q4_K_M.gguf",
    "good_for": "Candidate use cases require local evaluation.",
    "quantization": null,
    "quantization_source": "Unknown until runtime metadata is observed; catalog GGUF quantization does not prove Ollama quantization.",
    "catalog_file_quantization": "Q4_K_M",
    "catalog_estimates_verified": false
   },
   "installation_mode": "manual",
   "steps": [
    {
     "id": "install_runtime",
     "action": null,
     "kind": "manual",
     "title": "Manually install the runtime",
     "done": true,
     "why": "Model weights need a runtime that loads them and performs inference.",
     "does": "Review the official installer for your OS. Use a standard-user installation only. If the installer asks for admin access, or the OS blocks it, stop and ask the team for a supported route. Do not disable Gatekeeper, antivirus, execution policy, or other security protections.",
     "command": null,
     "args": {},
     "link": "https://ollama.com/download"
    },
    {
     "id": "start_runtime",
     "action": null,
     "kind": "manual",
     "title": "Manually start your runtime",
     "done": true,
     "why": "The lab talks to a model server on this laptop only.",
     "does": "Open/start it yourself. This helper does not launch programs or change system settings.",
     "command": "Open the Ollama application from your user account.",
     "args": {},
     "link": null
    },
    {
     "id": "pull_model",
     "action": null,
     "kind": "manual",
     "title": "Manually download phi3.5",
     "done": false,
     "why": "Download the exact catalog tag, then verify the result.",
     "does": "The catalog estimates about 2.4 GiB; the actual artifact and quantization must be checked. The 10 GiB project cap counts this selected model plus the lab, Python and runtime. Pre-existing unrelated models are reported separately.",
     "command": "ollama pull phi3.5",
     "args": {},
     "link": null
    },
    {
     "id": "verify_install",
     "action": "check_install",
     "kind": "action",
     "title": "Verify the manual steps",
     "done": false,
     "why": "Check observable prerequisites without hiding the installation process.",
     "does": "Read runtime/model state, provenance and the selected project's disk budget. This does not install or download anything.",
     "command": null,
     "args": {
      "up_to_step": 4
     },
     "link": null
    },
    {
     "id": "first_prompt",
     "action": "first_prompt",
     "kind": "action",
     "title": "Run a bounded first prompt",
     "done": false,
     "why": "A real response verifies that the prepared model can perform inference.",
     "does": "After resource checks, ask the selected model for a short greeting. Timing depends on this device.",
     "command": null,
     "args": {
      "model": "phi3.5"
     },
     "link": null
    }
   ]
  },
  "mistral:7b": {
   "model": {
    "name": "mistral:7b",
    "params_billion": 7.2,
    "download_file_size_gb": 4.4,
    "needs_free_ram_gb": 8.0,
    "requires_license_acceptance": false,
    "hf_repo": "bartowski/Mistral-7B-Instruct-v0.3-GGUF",
    "hf_file": "Mistral-7B-Instruct-v0.3-Q4_K_M.gguf",
    "good_for": "Candidate use cases require local evaluation.",
    "quantization": null,
    "quantization_source": "Unknown until runtime metadata is observed; catalog GGUF quantization does not prove Ollama quantization.",
    "catalog_file_quantization": "Q4_K_M",
    "catalog_estimates_verified": false
   },
   "installation_mode": "manual",
   "steps": [
    {
     "id": "install_runtime",
     "action": null,
     "kind": "manual",
     "title": "Manually install the runtime",
     "done": true,
     "why": "Model weights need a runtime that loads them and performs inference.",
     "does": "Review the official installer for your OS. Use a standard-user installation only. If the installer asks for admin access, or the OS blocks it, stop and ask the team for a supported route. Do not disable Gatekeeper, antivirus, execution policy, or other security protections.",
     "command": null,
     "args": {},
     "link": "https://ollama.com/download"
    },
    {
     "id": "start_runtime",
     "action": null,
     "kind": "manual",
     "title": "Manually start your runtime",
     "done": true,
     "why": "The lab talks to a model server on this laptop only.",
     "does": "Open/start it yourself. This helper does not launch programs or change system settings.",
     "command": "Open the Ollama application from your user account.",
     "args": {},
     "link": null
    },
    {
     "id": "pull_model",
     "action": null,
     "kind": "manual",
     "title": "Manually download mistral:7b",
     "done": false,
     "why": "Download the exact catalog tag, then verify the result.",
     "does": "The catalog estimates about 4.4 GiB; the actual artifact and quantization must be checked. The 10 GiB project cap counts this selected model plus the lab, Python and runtime. Pre-existing unrelated models are reported separately.",
     "command": "ollama pull mistral:7b",
     "args": {},
     "link": null
    },
    {
     "id": "verify_install",
     "action": "check_install",
     "kind": "action",
     "title": "Verify the manual steps",
     "done": false,
     "why": "Check observable prerequisites without hiding the installation process.",
     "does": "Read runtime/model state, provenance and the selected project's disk budget. This does not install or download anything.",
     "command": null,
     "args": {
      "up_to_step": 4
     },
     "link": null
    },
    {
     "id": "first_prompt",
     "action": "first_prompt",
     "kind": "action",
     "title": "Run a bounded first prompt",
     "done": false,
     "why": "A real response verifies that the prepared model can perform inference.",
     "does": "After resource checks, ask the selected model for a short greeting. Timing depends on this device.",
     "command": null,
     "args": {
      "model": "mistral:7b"
     },
     "link": null
    }
   ]
  }
 },
 "status_after": {
  "mistral:7b": {
   "runtime": {
    "name": "Ollama",
    "installed": true,
    "running": true,
    "models": [
     "mistral:7b"
    ],
    "lab_models": [
     "mistral:7b"
    ]
   },
   "installation_mode": "manual",
   "auto_setup": "optional, requires confirmation",
   "assistant": {
    "ready": true,
    "model": "mistral:7b",
    "wanted_model": "qwen2.5:3b",
    "guardrails_required": true,
    "comparison_mode": "Use the isolated text-only evaluation harness."
   },
   "platform_validation": "Windows implementation has automated tests, but no physical Windows validation is claimed.",
   "goals": {
    "try": {
     "label": "Try a small model",
     "detail": "Start with a smaller candidate."
    },
    "study": {
     "label": "Explore concepts",
     "detail": "Explain and test local inference."
    },
    "write": {
     "label": "Explore writing",
     "detail": "Compare sample outputs."
    },
    "code": {
     "label": "Explore coding",
     "detail": "Inspect and verify sample explanations."
    }
   }
  },
  "llama3.2:3b": {
   "runtime": {
    "name": "Ollama",
    "installed": true,
    "running": true,
    "models": [
     "llama3.2:3b"
    ],
    "lab_models": [
     "llama3.2:3b"
    ]
   },
   "installation_mode": "manual",
   "auto_setup": "optional, requires confirmation",
   "assistant": {
    "ready": true,
    "model": "llama3.2:3b",
    "wanted_model": "qwen2.5:3b",
    "guardrails_required": true,
    "comparison_mode": "Use the isolated text-only evaluation harness."
   },
   "platform_validation": "Windows implementation has automated tests, but no physical Windows validation is claimed.",
   "goals": {
    "try": {
     "label": "Try a small model",
     "detail": "Start with a smaller candidate."
    },
    "study": {
     "label": "Explore concepts",
     "detail": "Explain and test local inference."
    },
    "write": {
     "label": "Explore writing",
     "detail": "Compare sample outputs."
    },
    "code": {
     "label": "Explore coding",
     "detail": "Inspect and verify sample explanations."
    }
   }
  },
  "phi3.5": {
   "runtime": {
    "name": "Ollama",
    "installed": true,
    "running": true,
    "models": [
     "phi3.5"
    ],
    "lab_models": [
     "phi3.5"
    ]
   },
   "installation_mode": "manual",
   "auto_setup": "optional, requires confirmation",
   "assistant": {
    "ready": true,
    "model": "phi3.5",
    "wanted_model": "qwen2.5:3b",
    "guardrails_required": true,
    "comparison_mode": "Use the isolated text-only evaluation harness."
   },
   "platform_validation": "Windows implementation has automated tests, but no physical Windows validation is claimed.",
   "goals": {
    "try": {
     "label": "Try a small model",
     "detail": "Start with a smaller candidate."
    },
    "study": {
     "label": "Explore concepts",
     "detail": "Explain and test local inference."
    },
    "write": {
     "label": "Explore writing",
     "detail": "Compare sample outputs."
    },
    "code": {
     "label": "Explore coding",
     "detail": "Inspect and verify sample explanations."
    }
   }
  }
 }
};
