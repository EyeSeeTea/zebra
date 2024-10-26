import { FutureData } from "../../../../data/api-futures";
import { FormLables } from "../../../entities/ConfigurableForm";
import {
    DataSource,
    DiseaseOutbreakEventBaseAttrs,
} from "../../../entities/disease-outbreak-event/DiseaseOutbreakEvent";
import { Future } from "../../../entities/generic/Future";
import { Id } from "../../../entities/Ref";
import { Rule } from "../../../entities/Rule";
import { DiseaseOutbreakEventRepository } from "../../../repositories/DiseaseOutbreakEventRepository";
import { Maybe } from "../../../../utils/ts-utils";

export function getDiseaseOutbreakRulesLabels(
    options: {
        diseaseOutbreakEventRepository: DiseaseOutbreakEventRepository;
    },
    id?: Id
): FutureData<{ entity: Maybe<DiseaseOutbreakEventBaseAttrs>; rules: Rule[]; labels: FormLables }> {
    const { rules, labels } = getEventTrackerLabelsRules();
    if (id) {
        return options.diseaseOutbreakEventRepository.get(id).flatMap(diseaseOutbreakEventBase => {
            return Future.success({ entity: diseaseOutbreakEventBase, rules, labels });
        });
    } else {
        return Future.success({ entity: undefined, rules, labels });
    }
}

function getEventTrackerLabelsRules(): { rules: Rule[]; labels: FormLables } {
    return {
        // TODO: Get labels from Datastore used in mapEntityToInitialFormState to create initial form state
        labels: {
            errors: {
                field_is_required: "This field is required",
                field_is_required_na: "This field is required when not applicable",
            },
        },
        // TODO: Get rules from Datastore used in applyRulesInFormState
        rules: [
            {
                type: "toggleSectionsVisibilityByFieldValue",
                fieldId: "dataSource",
                fieldValue: DataSource.RTSL_ZEB_OS_DATA_SOURCE_EBS,
                sectionIds: ["hazardType_section"],
            },
            {
                type: "toggleSectionsVisibilityByFieldValue",
                fieldId: "dataSource",
                fieldValue: DataSource.RTSL_ZEB_OS_DATA_SOURCE_IBS,
                sectionIds: ["mainSyndrome_section", "suspectedDisease_section"],
            },
        ],
    };
}
